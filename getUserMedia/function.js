function hasGetUserMedia() {
  return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia || navigator.msGetUserMedia);
}

function SRecorder(stream) {
  let config = {};
  config.sampleBits = config.smapleBits || 8;
  config.sampleRate = config.sampleRate || (44100 / 6);
  var context = new AudioContext();
  var audioInput = context.createMediaStreamSource(stream);
  var recorder = context.createScriptProcessor(4096, 1, 1);
  var audioData = {
    size: 0          //录音文件长度
    , buffer: []    //录音缓存
    , inputSampleRate: context.sampleRate    //输入采样率
    , inputSampleBits: 16      //输入采样数位 8, 16
    , outputSampleRate: config.sampleRate    //输出采样率
    , oututSampleBits: config.sampleBits      //输出采样数位 8, 16
    , clear: function() {
      this.buffer = [];
      this.size = 0;
    }
    , input: function (data) {
      this.buffer.push(new Float32Array(data));
      this.size += data.length;
    }
    , compress: function () {
      var data = new Float32Array(this.size);
      var offset = 0;
      for (var i = 0; i < this.buffer.length; i++) {
        data.set(this.buffer[i], offset);
        offset += this.buffer[i].length;
      }
      var compression = parseInt(this.inputSampleRate / this.outputSampleRate);
      var length = data.length / compression;
      var result = new Float32Array(length);
      var index = 0, j = 0;
      while (index < length) {
        result[index] = data[j];
        j += compression;
        index++;
      }
      return result;
    }
    , encodeWAV: function () {
      var sampleRate = Math.min(this.inputSampleRate, this.outputSampleRate);
      var sampleBits = Math.min(this.inputSampleBits, this.oututSampleBits);
      var bytes = this.compress();
      var dataLength = bytes.length * (sampleBits / 8);
      var buffer = new ArrayBuffer(44 + dataLength);
      var data = new DataView(buffer);
      var channelCount = 1;
      var offset = 0;
      var writeString = function (str) {
        for (var i = 0; i < str.length; i++) {
          data.setUint8(offset + i, str.charCodeAt(i));
        }
      };
      writeString('RIFF'); offset += 4;
      data.setUint32(offset, 36 + dataLength, true); offset += 4;
      writeString('WAVE'); offset += 4;
      writeString('fmt '); offset += 4;
      data.setUint32(offset, 16, true); offset += 4;
      data.setUint16(offset, 1, true); offset += 2;
      data.setUint16(offset, channelCount, true); offset += 2;
      data.setUint32(offset, sampleRate, true); offset += 4;
      data.setUint32(offset, channelCount * sampleRate * (sampleBits / 8), true); offset += 4;
      data.setUint16(offset, channelCount * (sampleBits / 8), true); offset += 2;
      data.setUint16(offset, sampleBits, true); offset += 2;
      writeString('data'); offset += 4;
      data.setUint32(offset, dataLength, true); offset += 4;
      if (sampleBits === 8) {
        for (var i = 0; i < bytes.length; i++, offset++) {
          var s = Math.max(-1, Math.min(1, bytes[i]));
          var val = s < 0 ? s * 0x8000 : s * 0x7FFF;
          val = parseInt(255 / (65535 / (val + 32768)));
          data.setInt8(offset, val, true);
        }
      } else {
        for (var i = 0; i < bytes.length; i++, offset += 2) {
          var s = Math.max(-1, Math.min(1, bytes[i]));
          data.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
        }
      }
      return new Blob([data], { type: 'audio/wav' });
    }
  };
  this.start = function () {
    audioInput.connect(recorder);
    recorder.connect(context.destination);
  }
  this.stop = function () {
    recorder.disconnect();
  }
  this.getBlob = function () {
    return audioData.encodeWAV();
  }
  this.clear = function() {
    audioData.clear();
  }
  recorder.onaudioprocess = function (e) {
    audioData.input(e.inputBuffer.getChannelData(0));
  }
}

function blobToDataURL(blob, callback) {
  var a = new FileReader();
  a.onload = function (e) { callback(e.target.result); }
  a.readAsDataURL(blob);
}