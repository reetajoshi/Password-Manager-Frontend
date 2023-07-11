export default {
    mounted() {
        const authData = (this as any).$store.getters['auth/userData'];
        if (authData && authData.token) {
            if (authData.storage) {
                (this as any).$store.commit('auth/setUserData', authData);
            }
            (this as any).goHome();
        }
    },
    methods: {
        goHome() {
            (this as any).$router.push('/home')
        },
    }
}
