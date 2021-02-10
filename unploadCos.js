// uploadCdn.js build时上传cos
// 引用cos
// 引入模块
const COS = require('cos-nodejs-sdk-v5');
const glob = require('glob');
const path = require('path');

// 使用永久密钥创建实例
var cos = new COS({
    SecretId: 'AKIDnS8Zlm3ifARRByEzUuHTamiiZIni30LU',
    SecretKey: 'c18zB9tRlrkTxCGVQ5UgrCQPH0c2JSL0'
});

const isWindow = /^win/.test(process.platform)

let pre = path.resolve(__dirname, './dist/')+ (isWindow ? '\\' : '')
const files = glob.sync(
    `${path.join(
      __dirname,
      './dist/**/*.*'
    )}`
  )
pre = pre.replace(/\\/g, '/')
async function uploadFileCDN (files) {
    files.map(async file => {
        const key = getFileKey(pre, file)
        try {
            await uploadFIle(key, file)
            console.log(`上传成功 key: ${key}`)
        } catch (err) {
            console.log('error', err)
        }
    })
}
async function uploadFIle (key, localFile) {
    return new Promise((resolve, reject) => {
        // 分片上传
        cos.sliceUploadFile({
            Bucket: 'food-1300857246',
            Region: 'ap-chengdu',
            Key: '/'+key,
            FilePath: localFile
        }, function (err, data) {
            if(err){
                reject(err)
            }else{
                resolve(data)
            }
        });
    })
}
function getFileKey (pre, file) {
    if (file.indexOf(pre) > -1) {
      const key = file.split(pre)[1]
      return key.startsWith('/') ? key.substring(1) : key
    }
    return file
}

async function deleteOldFile(){
    cos.getBucket({
        Bucket: 'food-1300857246',
        Region: 'ap-chengdu',
    }, function(err, data) {
        if(err) {
            console.log(err)
        } else {
            var Objects=data.Contents.map(item=>{
                var newItem={
                    Key:item.Key
                }
                return newItem
            })
            if(Objects.length==0)return false
            cos.deleteMultipleObject({
                Bucket: 'food-1300857246',
                Region: 'ap-chengdu',
                Objects:Objects
            }, function(err, data) {
                if(err) {
                    console.log(err)
                }
            });
        }
    });
}

(async () => {
    console.time('清除上一次的cdn文件')
    await deleteOldFile()
    console.timeEnd('清除上一次的cdn文件')
    console.time('上传文件到cdn')
    await uploadFileCDN(files)
    console.timeEnd('上传文件到cdn')
    
})()