<!--单条消息-->
<script setup>
defineProps({
  msg: Object
})
</script>

<template>
  <div class="wrapper" :class="msg.self ? 'right' : 'left'">
    <div class="row">
      <div class="avatar">
        <span>{{ msg.username }}</span>
        <img src="https://picsum.photos/200/200" alt="">
      </div>
      <div class="main" :class="msg.self ? 'right' : 'left'">
        <div class="bubble" :class="msg.self ? 'bubble-right' : 'bubble-left'">
          {{ msg.content }}
        </div>
        <div class="meta">
          <div class="msg-info">
            <div class="info" :class="msg.self ? 'text-right' : 'text-left'">
              <p>{{ msg.time }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
}
.wrapper .row {
  display: flex;
  align-items: flex-start;
  flex-direction: row;
}
.main {
  display: flex;
  padding-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
  flex-direction: column;
}
.left {
  align-items: flex-start;
}

.right {
  align-items: flex-end;
}
.right .meta {
  text-align: right;
}
.right .row {
  flex-direction: row-reverse;
}
.bubble-left {
  border-radius: 0px 16px 16px 16px;
  color: black;
  background: linear-gradient(135deg, #f5f5f5, #e9e9e9);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}
.bubble-right {
  border-radius: 16px 0px 16px 16px;
  color: white;
  background: linear-gradient(135deg, #f4a259, #e67e22);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}
/* 气泡 */
.bubble {
  max-width: 60%;
  margin-left: 10px;
  margin-right: 10px;
  text-align: start;
  padding: 12px 16px;
  font-size: 14px;
}

.meta .msg-info {
  display: flex;
  margin-left: 10px;
  margin-right: 10px;
  max-width: 50%;
}
/* 信息 */
.text-left {
  text-align: start;
}
.text-right {
  text-align: end;
}
.meta .msg-info .info h2,
.meta .msg-info .info p{
  font-size: 12px;
  color: #666;
  margin-top: 4px;
}
.avatar {
  font-size: 80%;
  width: 50px;
  height: 50px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* 图片本体 */
.avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover; /* 防止图片拉伸 */
  display: block;
}
</style>