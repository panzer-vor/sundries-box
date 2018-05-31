
var db,dbName="project"
var DBOpenRequest = window.indexedDB.open(dbName, 1);

DBOpenRequest.onsuccess = function(event) {
    db = DBOpenRequest.result;
    method.show()
};

DBOpenRequest.onupgradeneeded = function(event) {
    var db = event.target.result;
    var objectStore = db.createObjectStore(dbName, {
        keyPath: 'id',
        autoIncrement: true
    });
    objectStore.createIndex('id', 'id', {
        unique: true
    });
    objectStore.createIndex('user', 'user');
    objectStore.createIndex('time', 'time');
    objectStore.createIndex('pass', 'pass');
};


var method = {
    add: function (newItem) {
        var transaction = db.transaction([dbName], "readwrite");
        // 打开已经存储的数据对象
        var objectStore = transaction.objectStore(dbName);
        // 添加到数据对象中
        var objectStoreRequest = objectStore.add(newItem);

    },
    edit: function (id, data) {
        // 编辑数据
        var transaction = db.transaction([dbName], "readwrite");
        // 打开已经存储的数据对象
        var objectStore = transaction.objectStore(dbName);
        // 获取存储的对应键的存储对象
        var objectStoreRequest = objectStore.get(id);
        // 获取成功后替换当前数据
        objectStoreRequest.onsuccess = function(event) {
            // 当前数据
            var myRecord = objectStoreRequest.result;
            // 遍历替换
            for (var key in data) {
                if (typeof myRecord[key] != 'undefined') {
                    myRecord[key] = data[key];
                }
            }
            // 更新数据库存储数据
            objectStore.put(myRecord);
            window.open("in.html","_self")
        };
    },
    del: function (id) {
        // 打开已经存储的数据对象
        var objectStore = db.transaction([dbName], "readwrite").objectStore(dbName);
        // 直接删除
        var objectStoreRequest = objectStore.delete(id);
        // 删除成功后
        objectStoreRequest.onsuccess = function() {
            method.show();
        };
    },
    show: function () {
        let htmlProjectList = []
        var objectStore = db.transaction(dbName).objectStore(dbName);
        objectStore.openCursor().onsuccess = function(event) {
            var cursor = event.target.result;
            // 如果游标没有遍历完，继续下面的逻辑
            if (cursor) {
                cursor.value.time =getDate(cursor.value.time)
                htmlProjectList.push(cursor.value)
                // 继续下一个游标项
                cursor.continue();
                // 如果全部遍历完毕
            } else {
                new Vue({
                    el:".table",
                    data:{
                        userdata:htmlProjectList,
                        disable:"disabled"
                    },
                    methods:{
                        cancel(id){
                            method.del(id)
                            window.open("in.html","_self")
                        },
                        edit(id,u,p,t){
                            var data = {
                                user:u,
                                pass:p,
                                time:t
                            }
                            method.edit(id, data);
                        }
                    }
                })
            }
        }
    }
};
function getDate(tm){
    var tt=new Date(tm).toLocaleString()
    return tt;
}




