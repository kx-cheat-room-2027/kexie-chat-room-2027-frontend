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

    onMounted(() => {
        loadMockData()
    })

    return {
        messages,
        sendMessage
    }
}