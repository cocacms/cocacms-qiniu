'use strict';

module.exports = {
  name: '七牛云上传',
  author: 'rojer',
  mail: 'rojerchen@qq.com',
  /**
   * 1 通用
   * 2 上传
   */
  type: 2,
  config: [
    /**
     * 单行文本 varchar
     * 整数 int
     * 小数 decimal
     * 多行文本 text
     * 单选 radio
     * 选择框 select
     * 多选 checkbox
     * 时间选择器 time
     * 日期选择器 date
     * 日期时间选择器 datetime
     * 图片 img
     * 文件 file
     * 富文本 richtext
     * 评分 rate
     * 开关 switch
     */
    {
      key: 'zone',
      name: '机房',
      type: 'select',
      rules: [{ required: true, message: '请输入' }],
      optionsArray: [
        { label: '华东', value: 'Zone_z0' },
        { label: '华北', value: 'Zone_z1' },
        { label: '华南  ', value: 'Zone_z2' },
        { label: '北美', value: 'Zone_na0' },
      ],
    },
    {
      key: 'prefix',
      name: '上传前缀',
      rules: [{ required: true, message: '请输入' }],
      type: 'varchar',
    },
    {
      key: 'bucketName',
      name: 'bucketName',
      rules: [{ required: true, message: '请输入' }],
      type: 'varchar',
    },
    {
      key: 'accessKey',
      name: 'accessKey',
      rules: [{ required: true, message: '请输入' }],
      type: 'varchar',
    },
    {
      key: 'secretKey',
      name: 'secretKey',
      rules: [{ required: true, message: '请输入' }],
      type: 'varchar',
    },
    {
      key: 'cdn',
      name: 'cdn',
      rules: [{ required: true, message: '请输入' }],
      type: 'varchar',
    },
  ],
};
