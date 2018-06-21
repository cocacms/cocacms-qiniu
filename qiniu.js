'use strict';

const Service = require('@cocacms/cocacms').Service;
const qiniu = require('qiniu');

class MailService extends Service {

  async install() {
    return true;
  }

  async uninstall() {
    return true;
  }

  _upload(readableStream, filename, config) {
    return new Promise((resolve, reject) => {
      if (!config) {
        reject(new Error('缺少七牛上传配置'));
      }
      const key = `${config.prefix}${filename}`;
      const mac = new qiniu.auth.digest.Mac(config.accessKey, config.secretKey);
      const options = {
        scope: `${config.bucketName}:${key}`,
      };
      const putPolicy = new qiniu.rs.PutPolicy(options);
      const uploadToken = putPolicy.uploadToken(mac);

      const qiniuConfig = config = new qiniu.conf.Config();
      qiniuConfig.zone = qiniu.zone[config.zone];
      const formUploader = new qiniu.form_up.FormUploader(qiniuConfig);
      const putExtra = new qiniu.form_up.PutExtra();
      formUploader.putStream(uploadToken, key, readableStream, putExtra, function(respErr,
        respBody, respInfo) {
        if (respErr) {
          reject(respErr);
          return;
        }

        if (respInfo.statusCode === 200) {
          resolve(respBody);
        } else {
          reject(respBody);
        }
      });
    });
  }

  /**
   * 七牛云上传
   *
   * @param {*} config 配置
   * @param {*} stream 流
   * @param {*} filename 文件名
   * @return {*} 处理结果
   * @memberof UploadService
   */
  async upload(config, stream, filename) {
    const result = await this._upload(stream, `${filename}`, config);
    return {
      url: `${config.cdn}${result.key}`,
    };
  }
}

module.exports = MailService;
