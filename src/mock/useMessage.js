import { ref, onMounted } from "vue";

const messages = ref([]);
let initialized = false;

export function useMessage() {
  function loadMockData() {
    messages.value = [
      {
        id: 1,
        content: "傻福？",
        self: false,
        time: "10:42AM",
        username: "小橘子",
      },
      {
        id: 2,
        content:
          "傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福？",
        self: true,
        time: "10:45AM",
        username: "大苹果",
      },
      {
        id: 3,
        content: "傻福傻福？",
        self: false,
        time: "11:15AM",
        username: "神秘人",
      },
      {
        id: 3,
        content: "傻",
        self: false,
        time: "11:15AM",
        username: "大纱布",
      },
      {
        id: 3,
        content: "傻",
        self: false,
        time: "11:15AM",
        username: "大纱布",
      },
      {
        id: 3,
        content: "傻",
        self: false,
        time: "11:15AM",
        username: "大纱布",
      },
      {
        id: 3,
        content: "傻",
        self: false,
        time: "11:15AM",
        username: "大纱布",
      },
      {
        id: 3,
        content: "傻",
        self: false,
        time: "11:15AM",
        username: "大纱布",
      },
      {
        id: 3,
        content: "傻",
        self: false,
        time: "11:15AM",
        username: "大纱布",
      },
      {
        id: 3,
        content: "傻",
        self: false,
        time: "11:15AM",
        username: "大纱布",
      },
      {
        id: 3,
        content: "傻",
        self: false,
        time: "11:15AM",
        username: "大纱布",
      },
      {
        id: 3,
        content: "傻",
        self: false,
        time: "11:15AM",
        username: "大纱布",
      },
      {
        id: 3,
        content: "傻",
        self: false,
        time: "11:15AM",
        username: "大纱布",
      },
      {
        id: 3,
        content: "傻",
        self: false,
        time: "11:15AM",
        username: "大纱布",
      },
      {
        id: 3,
        content: "傻",
        self: false,
        time: "11:15AM",
        username: "大纱布",
      },
      {
        id: 3,
        content: "傻",
        self: false,
        time: "11:15AM",
        username: "大纱布",
      },
      {
        id: 3,
        content: "傻",
        self: false,
        time: "11:15AM",
        username: "大纱布",
      },
    ];
  }

  function sendMessage(text) {
    messages.value.push({
      id: Date.now(),
      content: text,
      self: true,
      time: new Date().toLocaleTimeString(),
    });
  }
  function createNewMessage(text) {
    messages.value.push({
      id: Date.now(),
      content: text,
      self: false,
      username: "何意味",
      time: new Date().toLocaleTimeString(),
    });
  }

  async function createHistoryMessages() {
    const history = [
      {
        id: 1,
        content: "傻福？",
        self: false,
        time: "10:42AM",
        username: "小橘子",
      },
      {
        id: 2,
        content: "傻福傻福傻福傻福傻福…",
        self: true,
        time: "10:45AM",
        username: "大苹果",
      },
      {
        id: 3,
        content: "傻福傻福？",
        self: false,
        time: "11:15AM",
        username: "神秘人",
      },
      {
        id: 4,
        content: "傻",
        self: false,
        time: "11:15AM",
        username: "大纱布",
      },
    ];

    messages.value.unshift(...history);
  }

  onMounted(() => {
    loadMockData();
  });

  return {
    messages,
    sendMessage,
    createNewMessage,
    createHistoryMessages,
  };
}
