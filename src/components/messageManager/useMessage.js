import { ref, onMounted } from 'vue'

export function useMessage() {
    const messages = ref([])
    function loadMockData() {
        messages.value = [
            {
                id: 1,
                content: "傻福？",
                self: false,
                time: "10:42AM",
                username: "小橘子"
            },
            {
                id: 2,
                content: "傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福傻福？",
                self: true,
                time: "10:45AM",
                username: "大苹果"
            },
            {
                id: 3,
                content: "傻福傻福？",
                self: false,
                time: "11:15AM",
                username: "神秘人"
            },
            {
                id: 3,
                content: "傻",
                self: false,
                time: "11:15AM",
                username: "大纱布"
            }
        ]
    }

    function sendMessage(text) {
        messages.value.push({
            id: Date.now(),
            content: text,
            self: true,
            time: new Date().toLocaleTimeString()
        })
    }

    function createNewMessage(text) {
        messages.value.push({
        id: Date.now(),
        content: text,
        self: false,
        username: "对方",
        time: new Date().toLocaleTimeString()
    })
    }

    async function createHistoryMessages() {
    return new Promise((resolve) => {
        setTimeout(() => {

            const historyMessages = [
                {
                    id: Date.now() + 1,
                    content: "历史消息1",
                    self: false,
                    username: "历史用户",
                    time: "09:00AM"
                },
                {
                    id: Date.now() + 2,
                    content: "历史消息2",
                    self: true,
                    username: "我",
                    time: "09:01AM"
                }
            ]

            resolve(historyMessages)

        }, 500)
    })
}
    onMounted(() => {
        loadMockData()
    })

    return {
        messages,
        sendMessage,
         createNewMessage,
    createHistoryMessages
    }
}