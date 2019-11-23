class Player {
    constructor(el, app){
        this.app = app;
        this.playerDom = document.querySelector(el);
        this.audio = this.playerDom.querySelector("audio");
        this.pBar = this.playerDom.querySelector(".bar");
        this.cTime = this.playerDom.querySelector(".current-time");
        this.dTime = this.playerDom.querySelector(".total-time");
        
        this.filename = this.playerDom.querySelector(".file-name");
        this.filename.innerHTML = "선택한 파일이 없습니다.";

        this.playable = false;

        this.progress = this.playerDom.querySelector(".progress");
        this.playBtn = this.playerDom.querySelector("#playBtn");

        this.addEvent();

        requestAnimationFrame(()=>{
            this.frame();
        });
    }

    addEvent(){
        this.playBtn.addEventListener("click", ()=>{
            this.play();
        });
        document.querySelector("#stopBtn").addEventListener("click", ()=>{
            this.stop();
        });
        this.audio.addEventListener("loadeddata", ()=>{
            this.playable = true;
            this.audio.play();
        });

        this.progress.addEventListener("click", (e)=>{
            this.changeSeeking(e);
        })
    }

    loadMusic(file){
        let fileURL = URL.createObjectURL(file);
        this.audio.src = fileURL;
        this.filename.innerHTML = file.name;
        
    }

    play(){
        if(!this.playable) return;
        
        if(this.audio.paused){
            this.audio.play();
            this.playBtn.innerHTML = "일시정지";
        }else {
            this.audio.pause();
            this.playBtn.innerHTML = "재생";
        }
    }

    stop(){
        //나중에 이부분에 정지 제어가 들어갑니다.
        this.audio.pause();
    }

    frame(timestamp){
        this.render();
        requestAnimationFrame(()=>{
            this.frame();
        });
    }

    render(){
        if(!this.playable) return;

        let c = this.audio.currentTime;
        let d = this.audio.duration;
        this.pBar.style.width = `${c / d * 100}%`;

        
        this.cTime.innerHTML = c.timeFormat();
        this.dTime.innerHTML = d.timeFormat();
    
    }

    changeSeeking(e){
        if(!this.playable) return;
        
        let seek = e.offsetX / this.progress.clientWidth * this.audio.duration;
        this.audio.currentTime = seek;
    }
}