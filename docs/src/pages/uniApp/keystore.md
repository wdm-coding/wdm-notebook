# 自有证书生成流程
## 下载JDK
```json
{
  "Oracle官方":"https://www.oracle.com/java/technologies/downloads/#java8",
  "account":"wdmcoding0620@163.com"
  "password":"wdm"
}
``` 
## 配置环境变量
```bash
d:  
set PATH=%PATH%;"C:\Program Files\Java\jre1.8.0_201\bin"
```

## 执行生成命令
```bash
## keytool -genkey -alias [证书别名] -keyalg RSA -keysize 2048 -validity [证书的有效期] -keystore [证书文件名.keystore]
keytool -genkey -alias testalias -keyalg RSA -keysize 2048 -validity 36500 -keystore test.keystore
```

## 生成证书
```bash
Enter keystore password:  ## 输入证书文件密码，输入完成回车  
Re-enter new password:   ## 再次输入证书文件密码，输入完成回车  
What is your first and last name?  
  [Unknown]:  ## 输入名字和姓氏，输入完成回车  
What is the name of your organizational unit?  
  [Unknown]:  ## 输入组织单位名称，输入完成回车  
What is the name of your organization?  
  [Unknown]:  ## 输入组织名称，输入完成回车  
What is the name of your City or Locality?  
  [Unknown]:  ## 输入城市或区域名称，输入完成回车  
What is the name of your State or Province?  
  [Unknown]:  ## 输入省/市/自治区名称，输入完成回车  
What is the two-letter country code for this unit?  
  [Unknown]:  ## 输入国家/地区代号（两个字母），中国为CN，输入完成回车  
Is CN=XX, OU=XX, O=XX, L=XX, ST=XX, C=XX correct?  
  [no]:  ## 确认上面输入的内容是否正确，输入y，回车  
```

## 查看证书
```bash
keytool -list -v -keystore test.keystore  
Enter keystore password: ## 输入密码，回车
```