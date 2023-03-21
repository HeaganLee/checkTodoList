class TodoEventVideo {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null){
            this.#instance = new TodoEventVideo();
        }
        return this.#instance;
    }

    addEventShowVideo() {
        const mainBody = document.querySelectorAll(".main-body");
        mainBody.forEach(element => {

            let keyCodeList = [];
            element.onkeydown = () => {
                if((window.event.keyCode == 17 || window.event.keyCode == 13) && !keyCodeList.includes(window.event.keyCode)){
                    keyCodeList.push(window.event.keyCode);
                }

                let [ a = 0, b = 0 ] = keyCodeList;

                if(a + b == 30) {
                    const hiddenVideoCntent = document.querySelector(".hidden-video-content");
                    hiddenVideoCntent.classList.remove("hidden-content");
                    const hiddenVideo = document.querySelector("hidden-video");
                    hiddenVideo.autoplay = true;
                }
            }

            element.onkeyup = () => {
                keyCodeList = [];
            }
        });
    }

    addEventCloseVideo() {
        const closeButton = document.querySelector(".close-button");
        closeButton.onclick = () => {
            const hiddenVideoCntent = document.querySelector(".hidden-video-content");
            hiddenVideoCntent.classList.add("hidden-content");
        }
    }
}