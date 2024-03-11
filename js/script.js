window.onload = initialice;


function initialice()
{
      // Variables for Desktop
      let desktop = false;
      let rightBoxWrapper;
      let rightBox;
      let maxShifting;
      let currentScrollPos;
      let velocityAcumulator;
      let scrollingWindowTimer;

      // Constants for topicsProps Object
      let topic0;
      let topic1;
      let topic2;
      let section0;
      let section1;
      let section2;

      // Execute function every 50ms
      let scrollingInertiaInterval;
      let scrollingTimingInterval;

      // Hover
      let topics;
      let wrapperTopics;

      // Animation variables for scrolling chain
      let animationUp;
      let animationDown;

      // Object for desktop topic functionality
      let topicsProps;


      // Variables for mobile
      // let mobileVariables = {
      //       mainBox : null,
      //       leftBox: null,
      //       rightBox: null,
      //       navbar : null,
      //       stick : null,
      //       totalTopicOffsetY: null,
      // };

      // _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ -

      // Runtime
      let x = window.matchMedia("(max-width: 1200px)")
            responsiveListener(x) // Call listener function at run time

            function responsiveListener(x) {
                  if ( x.matches ) { // If media query matches
                        responsiveMobile();
                  } else {
                        responsiveDesktop();
                  }
            }

      function responsiveMobile()
      {
            // Nothing yet
      }

      function resetDesktopVariables()
      {
            // Variables for Desktop
            window.removeEventListener( "wheel", tellScroll );
            let desktop = false;
            let rightBoxWrapper = null;
            let rightBox = null;
            let maxShifting = null;
            let currentScrollPos = null;
            let velocityAcumulator = null;
            let scrollingWindowTime = null;

            // Constants for topicsProps Object
            let topic0 = null;
            let topic1 = null;
            let topic2 = null;
            let section0 = null;
            let section1 = null;
            let section2 = null;

            // Execute function every 50ms
            let scrollingInertiaInterval = null;
            let scrollingTimingInterval = null;

            // Hover
            let topics = null;
            let wrapperTopics = null;

            // Animation variables for scrolling chain
            let animationUp = null;
            let animationDown = null;

            // Object for desktop topic functionality
            let topicsProps;
      }

      function responsiveDesktop()
      {
            // document.onwheel = tellScroll;
            desktop = true;
            window.addEventListener( "wheel", tellScroll );
            rightBoxWrapper = document.querySelector( '.right-box-wrapper' );
            rightBox = document.querySelector( '.right-box' );
            maxShifting = rightBoxWrapper.clientHeight - rightBox.clientHeight;
            currentScrollPos = 0;
            velocityAcumulator = 0;
            scrollingWindowTimer = 0;

            // Constants for topicsProps Object
            topic0 = document.getElementById( "about-topic" );
            topic1 = document.getElementById( "experience-topic" );
            topic2 = document.getElementById( "projects-topic" );
            section0 = document.querySelector( ".about-section" );
            section1 = document.querySelector( ".experience-section" );
            section2 = document.querySelector( ".projects-section" );

            topicsProps = {
                  current: null,
                  last: null,
                  currentSelected: 0,
                  lastSelected: null,
                  mainFgColor: "#e4e3ff",
                  brighterMainFgColor: "#f0f0ff",
                  mainFgOpacityColor: "#e4e3ff55",
                  mainBgColor: "#c0bdfc",
                  mainBgOpacityColor1: "#c0bdfc99",
                  mainBgOpacityColor2: "#c0bdfc33",
                  transparent: "#00000000",

                  topicsIndex: [
                        topic0,
                        topic1,
                        topic2,
                  ],

                  topicsChildrenIndex: [
                        topic0.children[0],
                        topic1.children[0],
                        topic2.children[0],
                  ],

                  topicSectionsIndex: [
                        section0,
                        section1,
                        section2
                  ],

                  topicSectionsLimitPixels: [
                        0,
                        ( 
                         + section0.clientHeight
                         + parseInt(window.getComputedStyle(section0).getPropertyValue("margin-bottom").slice(0, -2))
                         + 1
                        ),
                        ( 
                         + section0.clientHeight
                         + parseInt(window.getComputedStyle(section0).getPropertyValue("margin-bottom").slice(0, -2))
                         + section1.clientHeight
                         + parseInt(window.getComputedStyle(section1).getPropertyValue("margin-bottom").slice(0, -2))
                         + 1
                        ),
                  ],

                  select: function( ev, i )
                  {
                        this.lastSelected = this.currentSelected;
                        this.currentSelected = i;

                        // If I have a previous selected element
                        if( this.lastSelected !== null ){ // Shift back
                                                          // Shift Back
                              this.topicsChildrenIndex[this.lastSelected].style.left = "0px";
                              // Deselect background
                              this.topicsIndex[this.lastSelected].style.transition = "none";
                              this.topicsIndex[this.lastSelected].style.backgroundColor = this.transparent;
                              this.topicsIndex[this.lastSelected].offsetHeight; // Trigger a reflow, flushing the CSS changes
                              this.topicsChildrenIndex[this.lastSelected].style.fontWeight = "400";
                              this.topicsChildrenIndex[this.lastSelected].style.color = this.mainFgColor;
                        }

                        // Shift 
                        this.topicsChildrenIndex[this.currentSelected].style.left = "5%";
                        // Select BG, FontWeight and Color
                        this.topicsIndex[this.currentSelected].style.transition = "none";
                        this.topicsIndex[this.currentSelected].style.backgroundColor = this.mainBgOpacityColor1;
                        this.topicsIndex[this.currentSelected].offsetHeight; // Trigger a reflow, flushing the CSS changes
                        this.topicsIndex[this.currentSelected].style.transition = "background-color 1.0s ease-in";
                        this.topicsIndex[this.currentSelected].style.backgroundColor = this.mainBgOpacityColor2;
                        this.topicsChildrenIndex[this.currentSelected].style.fontWeight = "900";
                        this.topicsChildrenIndex[this.currentSelected].style.color = this.brighterMainFgColor;

                        // If ev is not null, the alignNBlink function is executed 
                        if( ev ){
                              // Once a Topic is selected, align and blink right topic section ( -> )
                              this.alignNBlink( null, i );
                        } else {
                        }
                  },

                  colorMarkOn: function ( ev, i )
                  {
                        this.last = this.current;
                        this.current = i;
                        if( this.current !== this.currentSelected ) {
                              this.topicsChildrenIndex[this.current].style.fontWeight = "900";
                              this.topicsChildrenIndex[this.current].style.color = this.brighterMainFgColor;
                        }
                  },

                  colorMarkOff: function ( ev, i )
                  {
                        if( this.current !== this.currentSelected ) {
                              this.topicsChildrenIndex[this.current].style.fontWeight = "400";
                              this.topicsChildrenIndex[this.current].style.color = this.mainFgColor;
                        }
                  },

                  alignNBlink: function ( ev, i )
                  {

                        if( !ev ){ // if 'ev' is null. This function is invoked after the <select> function
                              rightBoxWrapper.style.animation = "none";
                              rightBoxWrapper.offsetTop;

                              // window.removeEventListener( "wheel", tellScroll );

                              // BLink
                              // Last selected
                              if( this.currentSelected != null ){
                                    this.topicSectionsIndex[this.lastSelected].offsetHeight; // Trigger a reflow, flushing the CSS changes
                                    this.topicSectionsIndex[this.lastSelected].style.backgroundColor = this.transparent;
                              }

                              // current selected --> < i >
                              this.topicSectionsIndex[this.currentSelected].style.transition = "none";
                              this.topicSectionsIndex[this.currentSelected].offsetHeight; // Trigger a reflow, flushing the CSS changes
                              this.topicSectionsIndex[this.currentSelected].style.backgroundColor = this.mainBgOpacityColor2;
                              this.topicSectionsIndex[this.currentSelected].offsetHeight; // Trigger a reflow, flushing the CSS changes
                              this.topicSectionsIndex[this.currentSelected].style.transition = "background-color 1.0s ease-in";
                              this.topicSectionsIndex[this.currentSelected].offsetHeight; // Trigger a reflow, flushing the CSS changes
                              this.topicSectionsIndex[this.currentSelected].style.backgroundColor = this.transparent;

                              // Clear the pool of rightBoxWrapper position
                              clearInterval(scrollingTimingInterval);

                              // Align
                              rightBoxWrapper.animate(
                                    {
                                          top: `${-this.topicSectionsLimitPixels[i]}px` // Scroll Up
                                    },
                                    {
                                          duration: 800,
                                          fill: "forwards",
                                          easing: "ease",
                                    }
                              ); // .addEventListener( "finish", restoreOnWheelListener );

                        } else { // if 'ev' is true. This function is invoked after the <tellScroll> function
                              if( true ){
                                    if( this.currentSelected == i ){
                                    }
                                    if( this.currentSelected != i ){

                                          // Unncomment the 16 lines below if you want sections to blink when wheel is scrolling
                                          // Select TOpic
                                          // // BLink
                                          // // Last selected
                                          // if( this.currentSelected != null && this.lastSelected != null ){
                                          //       this.topicSectionsIndex[this.lastSelected].offsetHeight; // Trigger a reflow, flushing the CSS changes
                                          //       this.topicSectionsIndex[this.lastSelected].style.backgroundColor = this.transparent;
                                          // }
                                          //
                                          // // current selected --> < i >
                                          //       this.topicSectionsIndex[i].style.transition = "none";
                                          // this.topicSectionsIndex[i].offsetHeight; // Trigger a reflow, flushing the CSS changes
                                          // this.topicSectionsIndex[i].style.backgroundColor = this.mainBgOpacityColor2;
                                          // this.topicSectionsIndex[i].offsetHeight; // Trigger a reflow, flushing the CSS changes
                                          // this.topicSectionsIndex[i].style.transition = "background-color 1.0s ease-in";
                                          // this.topicSectionsIndex[i].offsetHeight; // Trigger a reflow, flushing the CSS changes
                                          // this.topicSectionsIndex[i].style.backgroundColor = this.transparent;
                                          this.select( null, i );
                                    }
                              }

                        }
                  }
            };

            // Execute function every 50ms
            scrollingInertiaInterval = window.setInterval( velocityDecrementFunction, 100);
            scrollingTimingInterval = window.setInterval( selectByOffset, 900);

            // Hover
            topics = document.querySelectorAll( '.topics' );
            wrapperTopics = document.querySelectorAll( '.wrapper-topics' );

            // Topics Listeners
            topicsProps.topicsIndex[0].addEventListener( "mouseenter", (ev)=>{ topicsProps.colorMarkOn( ev, 0 ); } );
            topicsProps.topicsIndex[0].addEventListener( "mouseleave", (ev)=>{ topicsProps.colorMarkOff( ev, 0 ); } );
            topicsProps.topicsIndex[0].addEventListener( "click", clickOnTopics );
            topicsProps.topicsIndex[1].addEventListener( "mouseenter", (ev)=>{ topicsProps.colorMarkOn( ev, 1 ); } );
            topicsProps.topicsIndex[1].addEventListener( "mouseleave", (ev)=>{ topicsProps.colorMarkOff( ev, 1 ); } );
            topicsProps.topicsIndex[1].addEventListener( "click", clickOnTopics );
            topicsProps.topicsIndex[2].addEventListener( "mouseenter", (ev)=>{ topicsProps.colorMarkOn( ev, 2 ); } );
            topicsProps.topicsIndex[2].addEventListener( "mouseleave", (ev)=>{ topicsProps.colorMarkOff( ev, 2 ); } );
            topicsProps.topicsIndex[2].addEventListener( "click", clickOnTopics );

            // Begin selected the first topic as default
            topicsProps.select( null, 0 );

            // Animation variables for scrolling chain
            animationUp = null;
            animationDown = null;

            let briefcase = document.getElementById("briefcase");
            let leftPadlock = document.getElementById("briefcase-left-padlock");
            let rightPadlock = document.getElementById("briefcase-right-padlock");

            const briefcaseLocked = {
                  status: 0b00,
                  fatherNode: document.getElementById("briefcase-locked"),

                  renderStatus00: document.getElementById("briefcase-locked-status-00"),
                  renderStatus01: document.getElementById("briefcase-locked-status-01"),
                  renderStatus10: document.getElementById("briefcase-locked-status-10"),
                  renderStatus11: document.getElementById("briefcase-locked-status-11"),
            }

            const briefcaseUnlocked = {
                  fatherNode: document.getElementById("briefcase-unlocked"),
                  renderTopHalf: document.getElementById("briefcase-unlocked-top"),
                  renderBottomHalf: document.getElementById("briefcase-unlocked-bottom"),
            }

            const briefcasePadlockHitboxes = {
                  fatherNode: document.getElementById("briefcase-padlocks-hitboxes"),
            }

            const snd = new Audio("../audio/padlock-click.mp3"); // buffers automatically when created

            console.log(leftPadlock);

            leftPadlock.addEventListener( "click", 
                  () =>
                  {
                        toggleLockStatus(0b10)
                              snd.play();
                  }
            );

            rightPadlock.addEventListener( "click", 
                  () =>
                  {
                        toggleLockStatus(0b01)
                              snd.play();
                  }
            );

            function toggleLockStatus( statusUpdating )
            {
                  briefcaseLocked.status = briefcaseLocked.status ^ statusUpdating;
                  // console.log(statusUpdating);
                  console.log("%b" ,briefcaseLocked.status);
                  renderPadLocks();
                  checkBriefcaseUnlocked();
            }

            function renderPadLocks()
            {
                  if( briefcaseLocked.status == 0b00 ){
                        // briefcase.style.backgroundImage = "url( '../img/briefcase-unlocking/briefcase-00.png')";
                        briefcaseLocked.renderStatus00.style.zIndex = 3;
                        briefcaseLocked.renderStatus01.style.zIndex = 2;
                        briefcaseLocked.renderStatus10.style.zIndex = 2;
                        briefcaseLocked.renderStatus11.style.zIndex = 2;
                        briefcaseLocked.renderStatus11.style.offsetHeight
                              return;
                  }
                  if( briefcaseLocked.status == 0b01 ){
                        // briefcase.style.backgroundImage = "url( '../img/briefcase-unlocking/briefcase-01.png')";
                        briefcaseLocked.renderStatus00.style.zIndex = 2;
                        briefcaseLocked.renderStatus01.style.zIndex = 3;
                        briefcaseLocked.renderStatus10.style.zIndex = 2;
                        briefcaseLocked.renderStatus11.style.zIndex = 2;
                        briefcaseLocked.renderStatus11.style.offsetHeight
                              return;
                  }
                  if( briefcaseLocked.status == 0b10 ){
                        // briefcase.style.backgroundImage = "url( '../img/briefcase-unlocking/briefcase-10.png')";
                        briefcaseLocked.renderStatus00.style.zIndex = 2;
                        briefcaseLocked.renderStatus01.style.zIndex = 2;
                        briefcaseLocked.renderStatus10.style.zIndex = 3;
                        briefcaseLocked.renderStatus11.style.zIndex = 2;
                        briefcaseLocked.renderStatus11.style.offsetHeight
                              return;
                  }
                  if( briefcaseLocked.status == 0b11 ){
                        // briefcase.style.backgroundImage = "url( '../img/briefcase-unlocking/briefcase-11.png')";
                        briefcaseLocked.renderStatus00.style.zIndex = 2;
                        briefcaseLocked.renderStatus01.style.zIndex = 2;
                        briefcaseLocked.renderStatus10.style.zIndex = 2;
                        briefcaseLocked.renderStatus11.style.zIndex = 3;
                        briefcaseLocked.renderStatus11.style.offsetHeight
                              return;
                  }
            }

            function checkBriefcaseUnlocked()
            {
                  if( briefcaseLocked.status != 0b11 )
                        return;

                  briefcaseLocked.fatherNode.style.display = "none";
                  console.log(briefcaseLocked.fatherNode);
                  briefcasePadlockHitboxes.fatherNode.style.display = "none";
                  briefcaseUnlocked.fatherNode.style.display = "block";
                  // briefcaseUnlocked.fatherNode.style.offsetHeight;

                  setTimeout(
                        ()=>
                        {
                              briefcaseUnlocked.fatherNode.style.offsetHeight;
                              briefcaseUnlocked.renderTopHalf.style.top = "0px";
                              briefcaseUnlocked.renderBottomHalf.style.top = "0px";
                              briefcaseUnlocked.fatherNode.style.offsetHeight;
                              // briefcaseUnlocked.renderBottomHalf.classList.add(".briefcaseTransition")
                              // briefcaseUnlocked.renderTopHalf.classList.add(".briefcaseTransition")
                              briefcaseUnlocked.renderBottomHalf.style.transition = "top .5s ease";
                              briefcaseUnlocked.renderTopHalf.style.transition = "top .5s ease";
                              // briefcaseUnlocked.renderTopHalf.style.top = "0px";
                              // briefcaseUnlocked.renderBottomHalf.style.top = "0px";
                              briefcaseUnlocked.fatherNode.style.offsetHeight;
                              briefcaseUnlocked.renderTopHalf.style.top = "-13px";
                              briefcaseUnlocked.renderBottomHalf.style.top = "13px";
                              briefcaseUnlocked.fatherNode.style.offsetHeight;

                              setTimeout(
                                    ()=>
                                    {
                                          briefcaseUnlocked.renderBottomHalf.style.transition = "none";
                                          briefcaseUnlocked.renderTopHalf.style.transition = "none";
                                          briefcaseUnlocked.fatherNode.style.offsetHeight;
                                          window.addEventListener( "mousedown", briefcaseActivateDragMode )
                                    },
                                    500
                              );
                        },
                        150
                  )


            }



            let yPosAnchor;
            let yPosRefresh;
            let yAcumulativeAmount = 0;
            let current = 0;
            let offsetOpening;
            let moving = false;

            function briefcaseActivateDragMode( e )
            {
                  // e = e || window.event;
                  e.preventDefault();
                  yPosAnchor = e.clientY;
                  window.addEventListener("mousemove", briefcaseDraggingOnMove);
                  window.addEventListener("mouseup", briefcaseDeactivateDragMode);
                  console.log( "yPosAnchor" + yPosAnchor );
                  // document.addEventListener('mousemove', drawMouseMove);
                  // document.addEventListener('mouseup', endMouseUp);
                              console.log( "offsetTop" + briefcaseUnlocked.renderBottomHalf.offsetTop );
                              console.log( "offsetTop" + briefcaseUnlocked.renderTopHalf.offsetTop );
            }



            function briefcaseDraggingOnMove(e){
                  // e = e || window.event;
                  yPosRefresh = yPosAnchor - e.clientY;
                  yPosAnchor = e.clientY;

                  if( yPosRefresh === 0 )
                        return;

                  yAcumulativeAmount = (Math.abs(yPosRefresh) );
                  console.log( yAcumulativeAmount );

                  console.log(briefcaseUnlocked.renderTopHalf.offsetTop);
                  console.log(briefcaseUnlocked.renderBottomHalf.offsetTop);

                  let topHalfMove = briefcaseUnlocked.renderTopHalf.offsetTop - yAcumulativeAmount;
                  let bottomHalfMove = briefcaseUnlocked.renderBottomHalf.offsetTop + yAcumulativeAmount;

                                          briefcaseUnlocked.renderBottomHalf.style.transition = "none";
                                          briefcaseUnlocked.renderTopHalf.style.transition = "none";
                                          briefcaseUnlocked.fatherNode.style.offsetHeight;
                  // briefcaseUnlocked.renderTopHalf.style.transform = `translate(${topHalfMove}px)`;
                  // briefcaseUnlocked.renderBottomHalf.style.transform = `translate(${bottomHalfMove}px)`;

                  briefcaseUnlocked.renderTopHalf.style.top = `${topHalfMove}px`;
                  briefcaseUnlocked.renderBottomHalf.style.top = `${bottomHalfMove}px`;

                   // https://codepen.io/Hyperplexed/pen/MWXBRBp

                  // console.log( briefcaseUnlocked.renderBottomHalf.offsetTop );
                  // console.log( briefcaseUnlocked.renderTopHalf.offsetTop );
                  // console.log( "yPosAnchor" + yPosAnchor );
                  // console.log( "yPosRefresh" + yPosRefresh );
                  // chunks.style.left = (chunks.offsetLeft - yPosRefresh) + "px";
                  //
                  // if( go beyond a limit )
                  //    automatic full opening
                  // if( go underneath a limit )
                  //    deactivateDragMode
                  //    go to starting position
            }


            //
            function briefcaseDeactivateDragMode(){
                  window.removeEventListener("mousemove", briefcaseDraggingOnMove);
                  window.removeEventListener("mouseup", briefcaseDeactivateDragMode);
                  // document.removeEventListener('mousemove', drawMouseMove);
                  // document.removeEventListener('mouseup', endMouseUp);
            }




            function restoreOnWheelListener(ev)
            {
                  window.addEventListener( "wheel", tellScroll );
            }

            function selectByOffset(ev)
            {
                  // settimeout(
                  //       ()=>
                  //       {
                  //
                  //       }, 2000
                  // )
                  currentScrollPos = rightBoxWrapper.offsetTop;
                  if( currentScrollPos <= -topicsProps.topicSectionsLimitPixels[0] && currentScrollPos > -topicsProps.topicSectionsLimitPixels[1] )
                        topicsProps.alignNBlink( true, 0 );
                  if( currentScrollPos <= -topicsProps.topicSectionsLimitPixels[1] && currentScrollPos > -topicsProps.topicSectionsLimitPixels[2] )
                        topicsProps.alignNBlink( true, 1 );
                  if( currentScrollPos <= -topicsProps.topicSectionsLimitPixels[2] )
                        topicsProps.alignNBlink( true, 2 );
            }

            function clickOnTopics( ev )
            {
                  if( ev.target === topicsProps.topicsChildrenIndex[0] || ev.target === topicsProps.topicsIndex[0] )
                        topicsProps.select( ev, 0 );
                  if( ev.target === topicsProps.topicsChildrenIndex[1] || ev.target === topicsProps.topicsIndex[1] )
                        topicsProps.select( ev, 1 );
                  if( ev.target === topicsProps.topicsChildrenIndex[2] || ev.target === topicsProps.topicsIndex[2] )
                        topicsProps.select( ev, 2 );
            }

            function scrollingWindow()
            {
                  if( !scrollingWindowTimer ){
                        topicsProps.topicsIndex[0].addEventListener( "click", clickOnTopics );
                        topicsProps.topicsIndex[1].addEventListener( "click", clickOnTopics );
                        topicsProps.topicsIndex[2].addEventListener( "click", clickOnTopics );
                  } else {
                        scrollingWindowTimer -= 1;
                  }
            }

            function velocityDecrementFunction()
            {
                  velocityAcumulator ? velocityAcumulator -= 50 : false;
            }

            function tellScroll(ev)
            {
                  // The actual Y-Offset of the right box 
                  currentScrollPos = rightBoxWrapper.offsetTop;


                  // Predetermine the total amount of Y-Offset to increment/decrement
                  velocityAcumulator < 300 ? velocityAcumulator += 100 : false;

                  // // Remove Topics CLicks
                  // topicsProps.topicsIndex[0].removeEventListener( "click", clickOnTopics );
                  // topicsProps.topicsIndex[1].removeEventListener( "click", clickOnTopics );
                  // topicsProps.topicsIndex[2].removeEventListener( "click", clickOnTopics );

                  // Start scrollingWindowTimer
                  // scrollingWindowTimer = 1;

                  // Clear and aplying the pooling of rightBoxWrapper position ( the timer of 900ms forbids multiple selections at wheel scrolling )
                  clearInterval(scrollingTimingInterval);
                  scrollingTimingInterval = window.setInterval( selectByOffset, 900);

                  // Up or Down scrolling
                  if( ev.deltaY > 0 ){
                        // Limit the amount of shifting to keep the box in the display
                        let amount = (currentScrollPos - velocityAcumulator) > -(maxShifting) ? (currentScrollPos - velocityAcumulator) : -(maxShifting);
                        animationDown = rightBoxWrapper.animate(
                              {
                                    top: `${amount}px` // Scroll Up
                              },
                              {
                                    duration: 800,
                                    fill: "forwards",
                                    easing: "ease",
                              }
                        );
                        // animationDown.addEventListener( "finish", selectByOffset );
                  } else {
                        let amount = (currentScrollPos + velocityAcumulator) >= 0 ? 0 : (currentScrollPos + velocityAcumulator);
                        animationUp = rightBoxWrapper.animate(
                              {
                                    top: `${amount}px` // Scroll Up
                              },
                              {
                                    duration: 800,
                                    fill: "forwards",
                                    easing: "ease",
                              }
                        );
                        // animationUp.addEventListener( "finish", selectByOffset );
                  }
            }



      }


}
