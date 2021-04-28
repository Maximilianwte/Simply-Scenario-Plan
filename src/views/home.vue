<template>
    <div id="home" class="flex-col pt-24">
        <div id="featureTracker" class="border-2 rounded px-8 py-4">
            <h4 class="text-xl">Feature Tracker</h4>
            <p class="text-base text-alternative">What features will be released next?</p>
            <li class="mt-8 mb-4">
                <ul class="flex items-center justify-between">
                    <div class="text">
                        <h6 class="mr-4">1. Backend Integration</h6>
                        <p class="text-sm text-alternative">Release in 22 days.</p>
                    </div>
                    <progressBar class="" loadState="22" />
                </ul>
                <ul class="flex items-center justify-between mt-4">
                    <div class="text">
                        <h6 class="mr-4">2. More charting features</h6>
                        <p class="text-sm text-alternative">Release in 28 days.</p>
                    </div>
                    <progressBar class="" loadState="14" />
                </ul>
            </li>
        </div>
        <div id="featureVoter" class="border-2 rounded px-8 py-4 mt-8">
            <h4 class="text-xl">Vote Features</h4>
            <p class="text-base text-alternative">What feature do you want built next?</p>
            <li class="mt-8 mb-4">
                <ul class="flex items-center">
                        <h6 class="mr-4">1. More colors</h6>
                        <button class="bg-focus hover:bg-main text-white rounded px-4 py-2">Vote</button>
                </ul>
                <ul class="flex items-center mt-4">
                        <h6 class="mr-4">2. Saving all data</h6>
                        <button class="bg-focus hover:bg-main text-white rounded px-4 py-2">Vote</button>
                </ul>
                <ul class="flex items-center mt-4">
                        <input type="text" class="w-40 border-2 rounded mr-4" placeholder="3. New input">
                        <button class="bg-focus hover:bg-main text-white rounded px-4 py-2">Vote</button>
                </ul>
            </li>
        </div>
    </div>
</template>
<script>
import progressBar from "../components/progressBar";
export default {
    components: {progressBar}
}
</script>