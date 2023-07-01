# mpsps : simple_blog_backend

#### 使用koa框架，简单的博客后台

## 用户

### 1.	创建用户 *POST* /user 

```javascript
{
  "name": "***",
  "password": ***
}
```



### 2.	登录 *POST*  /login

```javascript
{
  "password": "**",
  "name":"**"
}
//登陆后会返回Token，user_id和user_name 使用需要登录功能需要在headers里面的Authorization项添加"Bearer "+返回的Token
```

### *凡是需要Token的功能下面会**星号**标记*

### 获取用户头像 GET users/{user_id}/avatar

## 动态

### 1.	*发表动态 *POST* /moment

```javascript
{
  "content":"11",//内容
  "title":"11",//标题
  "type":"6"//类型
}
```



### 2.	获取某动态 *GET* /moment/{moment_id}

### 3.	获取动态列表 *GET* /?offset={x}&size={y} 

​	x为起始位置，y为个数

### 4.	*修改某动态 *PATCH* /moment/{moment_id}

### 5.	*删除某动态 *DELETE* /moment/{moment_id}

### 获取某用户所有文章 *GET* /moment/personalspace/{user_id}

## 评论

### 1.	*发表评论 *POST* /comment

```javascript
{
  "momentId":1,//文章id
  "content":"11"//评论内容
}
```

### 2.	*回复他人评论 *POST* /comment/{被回复的评论id}/reply

```javascript
{
  "momentId":7,//文章id
  "content":"确实"//评论内容
}
```

### 3.	*删除评论 *DELETE* /comment/{comment_id}/delete

### 4.	获取某动态的评论 *GET* /comment/get/{moment_id}

## 上传

### 1.	*上传头像 *POST* /upload/avatar

​	body为form-data格式，key为avatar

### 2.	*上传图片 *POST* /upload/picture?momentId={moment_id}

​	body为form-data格式，key为picture

## 点赞

### 1. 获取点赞列表 *GET* /commend

```javascript
{
  "momentId":28
}
```

### 2.	*文章点赞 *POST* /commend

```javascript
{
  "momentId":28
}
```

## 通知

### 1.	*获取通知 GET /notify

### 2.	*添加通知 POST /notify

```javascript
{
  "momentId":7,//通知发生的文章id
  "masterid":7,//通知接收人id
  "type":"comment" //类型 比如点赞 评论
}
```

### 3. 	*清除通知 DELETE /notify/{user_id}



