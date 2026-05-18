<!--单条消息-->
<script setup>
const props =defineProps({
  msg: Object,
});

</script>

<template>
  <div class="wrapper" :class="msg.self ? 'right' : 'left'">
    <div class="row">
      <div class="avatar">
        <span>{{ msg.username }}</span>
        <img src="https://picsum.photos/200/200" alt="" />
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
  width: 100%;
  display: flex;
  flex-direction: column;
}
.wrapper .row {
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: row;
}
.main {
  width: 100%;
  display: flex;
  padding-top: 5px;
  margin-left: 5px;
  margin-right: 5px;
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
  color: black;
  background: linear-gradient(135deg, #f5f5f5, #e9e9e9);
}
.bubble-right {
  color: white;
  background: linear-gradient(135deg, #f4a259, #e4883a);
}
/* 气泡 */
.bubble {
  max-width: 40%;
  margin-left: 5px;
  margin-right: 5px;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  text-align: start;
  padding: 5px 10px;
  font-size: 14px;
  display: flex;
  flex-direction: row;
}

.meta .msg-info {
  display: flex;
  margin-left: 5px;
  margin-right: 5px;
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
.meta .msg-info .info p {
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
