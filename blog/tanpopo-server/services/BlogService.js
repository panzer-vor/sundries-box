const BlogModel = require("../models/BlogModel");
const formidable = require("formidable");

class BlogService {
  constructor() {}
  async addBlog(ctx) {
    let res = {
      Code: 0,
      BackData: null
    };
    let form = new formidable.IncomingForm();
    form.encoding = "utf-8";
    form.uploadDir = `./public/resource/blogResource`;
    form.keepExtensions = true;
    form.maxFieldsSize = 20 * 1024 * 1024;
    let fields = await new Promise(resolve => {
      form.parse(ctx.req, (err, fields, files) => {
        if (err) {
          console.log(err);
          resolve(0);
          return;
        }
        if (files.avatar) {
          fields.avatar = files.avatar.path.replace("public", "");
        }
        if (files.music) {
          fields.music = files.music.path.replace("public", "");
        }
        fields.time = new Date();

        resolve(fields);
      });
    });
    let rs = await BlogModel.create(fields);
    if (rs != null) {
      res.BackData = rs;
      res.StrCode = ctx.request.body;
      res.Code = 1;
    }
    ctx.body = res;
  }
  async allBlog(ctx) {
    let res = {
      Code: 0,
      BackData: null
    };
    let page = ctx.request.body.page;
    let rs = await BlogModel.findAndCountAll({
        attributes: { exclude: ['article'] },
      offset: ~~(4 * page),
      limit: 4
    });
    if (rs != null) {
      res.BackData = rs;
      res.StrCode = ctx.request.body;
      res.Code = 1;
    }
    ctx.body = res;
  }
  async delete(ctx) {
    let res = {
      Code: 0,
      BackData: null
    };
    const id = ctx.request.body.id;
    let blog = {
      id: id
    };
    let rs = await BlogModel.destroy({ where: { id: id } });
    if (rs != null) {
      res.BackData = rs;
      res.Code = 1;
    }
    ctx.body = res;
  }
  async getBlog(ctx) {
    let res = {
      Code: 0,
      BackData: null
    };
    const id = ctx.request.body.id;
    let rs = await BlogModel.findOne({ where: { id: id } });
    if (rs != null) {
      res.BackData = rs;
      res.Code = 1;
    }
    ctx.body = res;
  }
  async editBlog(ctx) {
    let res = {
      Code: 0,
      BackData: null
    };
    let form = new formidable.IncomingForm();
    form.encoding = "utf-8";
    form.uploadDir = `./public/resource/blogResource`;
    form.keepExtensions = true;
    form.maxFieldsSize = 20 * 1024 * 1024;
    console.log(
      "==================================================================================================================================================="
    );
    console.log(form);
    let fields = await new Promise(resolve => {
      form.parse(ctx.req, (err, fields, files) => {
        if (err) {
          console.log(err);
          resolve(0);
          return;
        }
        if (files.avatar) {
          fields.avatar = files.avatar.path.replace("public", "");
        }
        if (files.music) {
          fields.music = files.music.path.replace("public", "");
        }
        fields.time = new Date();
        resolve(fields);
      });
    });
    let rs = await BlogModel.update(fields, { where: { id: fields.id } });
    if (rs != null) {
      res.Code = 1;
    }
    ctx.body = res;
  }
}

exports.service = BlogService;
