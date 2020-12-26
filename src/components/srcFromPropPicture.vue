<template>
    <div class="img text-3xl">
        <img :src="resolve_img_url(src)" :alt="alt" />
    </div>
</template>
<script>
    export default {
        props: ['src', 'alt'],
        methods: {
            resolve_img_url: function (path) {
                let images = require.context('../assets/', false, /\.png$|\.jpg$/)
                return images("./" + path)
            }
        }
    }
</script>