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
      let scrollingWindowTimer

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
      let mobileVariables = {
            mainBox : null,
            leftBox: null,
            rightBox: null,
            navbar : null,
            stick : null,
            totalTopicOffsetY: null,
      };

      // _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ -

            // Runtime
      let x = window.matchMedia("(max-width: 1200px)")
      responsiveListener(x) // Call listener function at run time
      // x.addListener(responsiveListener) // Attach listener function on state changes

      // window.addEventListener( "resize", responsiveListener );
      //


            function responsiveListener(x) {
                  if ( x.matches ) { // If media query matches
                        responsiveMobile();
                  } else {
                        responsiveDesktop();
                  }
            }

      function responsiveMobile()
      {

            // When the user scrolls the page, execute myFunction
            // window.onscroll = myFunction;
            // window.addEventListener( "scroll", myFunction );
            mobileVariables.mainBox = document.querySelector( ".main-box" );
            mobileVariables.leftBox = document.querySelector( ".left-box" );
            mobileVariables.rightBox = document.querySelector( ".right-box" );

            // Get the navbar
            mobileVariables.navbar = document.getElementById("only-for-test");
            mobileVariables.sticky = mobileVariables.navbar.offsetTop;

            // mobileVariables.mainBox.addEventListener( "scroll", myFunction );

            mobileVariables.totalTopicOffsetY =
                  + parseInt(window.getComputedStyle(mobileVariables.mainBox).getPropertyValue("padding-top").slice(0, -2))
                  + parseInt(window.getComputedStyle(mobileVariables.leftBox).getPropertyValue("margin-top").slice(0, -2))
                  + mobileVariables.leftBox.clientHeight
                  + parseInt(window.getComputedStyle(mobileVariables.leftBox).getPropertyValue("margin-bottom").slice(0, -2))
            ;

            console.log( mobileVariables.totalTopicOffsetY );
            // console.log( 
                  //         parseInt(window.getComputedStyle(mobileVariables.mainBox).getPropertyValue("padding-top").slice(0, -2))
                  //       , parseInt(window.getComputedStyle(mobileVariables.leftBox).getPropertyValue("margin-top").slice(0, -2))
                  //       , mobileVariables.leftBox.clientHeight
                  //       , parseInt(window.getComputedStyle(mobileVariables.leftBox).getPropertyValue("margin-bottom").slice(0, -2))
                  // );

      }

      function myFunction()
      {
            console.warn( "SCROLL ON MOBILE" );
            console.log( " mainBox.scrollTop ---> " + mobileVariables.mainBox.scrollTop);
            console.log( " mainBox.offsetTop ---> " + mobileVariables.mainBox.offsetTop);
            console.log( " navbar.offsetTop ---> " + mobileVariables.navbar.offsetTop );
            console.log( " navbar.scrollY ---> " + mobileVariables.navbar.scrollY );

            if( mobileVariables.mainBox.scrollTop >= mobileVariables.totalTopicOffsetY ){
                  mobileVariables.navbar.classList.add("sticky")
                  console.log( mobileVariables.rightBox );
            } else {
                  mobileVariables.navbar.classList.remove("sticky");
                  console.log( mobileVariables.rightBox );
            }

            // sticky = navbar.offsetTop;
            // console.log( sticky );
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
                  currentSelected: null,
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

                        // Remove event listeners
                        // topicsProps.topicsIndex[0].removeEventListener( "click", clickOnTopics );
                        // topicsProps.topicsIndex[1].removeEventListener( "click", clickOnTopics );
                        // topicsProps.topicsIndex[2].removeEventListener( "click", clickOnTopics );

                        console.log( "CURRENT" + i );
                        console.log( "lastSelected" + this.lastSelected );
                        console.log( "currentSelected" + this.currentSelected );


                        // If I have a previous selected element
                        if( this.lastSelected !== null ){ // Shift back
                              // Shift Back
                              this.topicsChildrenIndex[this.lastSelected].style.left = "0px";
                              // Deselect background
                              // this.lastSelected.classList.add('notransition');
                              this.topicsIndex[this.lastSelected].style.transition = "none";
                              this.topicsIndex[this.lastSelected].style.backgroundColor = this.transparent;
                              this.topicsIndex[this.lastSelected].offsetHeight; // Trigger a reflow, flushing the CSS changes
                              this.topicsChildrenIndex[this.lastSelected].style.fontWeight = "400";
                              this.topicsChildrenIndex[this.lastSelected].style.color = this.mainFgColor;
                        }

                        // Shift 
                        this.topicsChildrenIndex[this.currentSelected].style.left = "5%";
                        // Select BG
                        // this.topicsIndex[this.currentSelected].classList.add('notransition');
                        this.topicsIndex[this.currentSelected].style.transition = "none";
                        this.topicsIndex[this.currentSelected].style.backgroundColor = this.mainBgOpacityColor1;
                        this.topicsIndex[this.currentSelected].offsetHeight; // Trigger a reflow, flushing the CSS changes
                        this.topicsIndex[this.currentSelected].style.transition = "background-color 1.0s ease-in";
                        this.topicsIndex[this.currentSelected].style.backgroundColor = this.mainBgOpacityColor2;
                        this.topicsChildrenIndex[this.currentSelected].style.fontWeight = "900";
                        this.topicsChildrenIndex[this.currentSelected].style.color = this.brighterMainFgColor;

                        // setTimeout(
                              //       ()=>
                              //       {
                                    //             topicsProps.topicsIndex[0].addEventListener( "click", clickOnTopics );
                                    //             topicsProps.topicsIndex[1].addEventListener( "click", clickOnTopics );
                                    //             topicsProps.topicsIndex[2].addEventListener( "click", clickOnTopics );
                                    //       },
                              //       8000
                              // )

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

                              // // Clear selecting trigger by offset changes
                              // clearInterval(rBoxInterv);

                              // Move and Blink section ( without selecting topic )
                              // rightBoxWrapper.classList.remove( "noanimation" );
                              //

                                    // console.log( animationUp + animationDown );
                              // try{
                                    //       animationUp.cancel();
                                    //       animationDown.cancel();
                                    // } catch {
                                          //       console.warn( "no animatin ongoing" );
                                          // }

                              rightBoxWrapper.style.animation = "none";
                              rightBoxWrapper.offsetTop;

                              window.removeEventListener( "wheel", tellScroll );

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

                              // Align
                              console.log( this.topicSectionsLimitPixels );
                              rightBoxWrapper.animate(
                                    {
                                          top: `${-this.topicSectionsLimitPixels[i]}px` // Scroll Up
                                    },
                                    {
                                          duration: 800,
                                          fill: "forwards",
                                          easing: "ease",
                                    }
                              ).addEventListener( "finish", restoreOnWheelListener );

                              // setTimeout(() => {
                                    //       rBoxInterv = window.setInterval( selectByOffset, 50);
                                    // }, "800");


                        } 
                        else { // if 'ev' is true. This function is invoked after the <tellScroll> function
                              if( true ){
                                    if( this.currentSelected == i ){
                                    }
                                    if( this.currentSelected != i ){
                                          console.log( "CURRENT SELECTED : : : : " + i );
                                          console.log( ev );
                                          // Blink Section ( select topic )

                                          // BLink
                                          // Last selected
                                          // if( this.currentSelected != null ){
                                                //       this.topicSectionsIndex[this.currentSelected].offsetHeight; // Trigger a reflow, flushing the CSS changes
                                                //       this.topicSectionsIndex[this.currentSelected].style.backgroundColor = "#dbbc7f00";
                                                // }
                                          //
                                                // // current selected --> < i >
                                                // this.topicSectionsIndex[i].style.transition = "none";
                                          // this.topicSectionsIndex[i].offsetHeight; // Trigger a reflow, flushing the CSS changes
                                          // this.topicSectionsIndex[i].style.backgroundColor = "#dbbc7f33";
                                          // this.topicSectionsIndex[i].offsetHeight; // Trigger a reflow, flushing the CSS changes
                                          // this.topicSectionsIndex[i].style.transition = "background-color 0.5s ease-in";
                                          // this.topicSectionsIndex[i].offsetHeight; // Trigger a reflow, flushing the CSS changes
                                          // this.topicSectionsIndex[i].style.backgroundColor = "#dbbc7f00";



                                          // Select TOpic
                                          this.select( null, i );
                                          console.log( "Select this: : : : " + i );
                                    }
                              }

                        }
                  }
            };

            // Execute function every 50ms
            scrollingInertiaInterval = window.setInterval( velocityDecrementFunction, 100);
            scrollingTimingInterval = window.setInterval( scrollingWindow, 900);

            console.log( section0 );
            // section0.style.backgroundColor = "#dbbc7f99";

            // Hover
            topics = document.querySelectorAll( '.topics' );
            wrapperTopics = document.querySelectorAll( '.wrapper-topics' );

            // console.log(topics);
            // console.log(wrapperTopics);

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


      }

      function restoreOnWheelListener(ev)
      {
            window.addEventListener( "wheel", tellScroll );
      }

      function selectByOffset(ev)
      {
            console.log( "hola papeh. ANIMATION END --> <><> <><>" );
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
            // console.log( "velocity" + velocityAcumulator );
            velocityAcumulator ? velocityAcumulator -= 50 : false;
      }

      function tellScroll(ev)
      {
            // The actual Y-Offset of the right box 
            currentScrollPos = rightBoxWrapper.offsetTop;
            console.log( currentScrollPos );
            console.log( ev.deltaY );
            // Predetermine the total amount of Y-Offset to increment/decrement
            // let totalVelocity = velocityAcumulator + 120;
            // velocityAcumulator += 120;
            velocityAcumulator < 300 ? velocityAcumulator += 100 : false;

            // Remove Topics CLicks
            topicsProps.topicsIndex[0].removeEventListener( "click", clickOnTopics );
            topicsProps.topicsIndex[1].removeEventListener( "click", clickOnTopics );
            topicsProps.topicsIndex[2].removeEventListener( "click", clickOnTopics );

            // Start scrollingWindowTimer
            scrollingWindowTimer = 1;

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
                  animationDown.addEventListener( "finish", selectByOffset );
                  // console.log( rightBoxWrapper.offsetTop );
            } else {
                  // console.log( rightBoxWrapper.offsetTop );
                  let amount = (currentScrollPos + velocityAcumulator) >= 0 ? 0 : (currentScrollPos + velocityAcumulator);
                  // console.log( `Amount: ${amount}` );
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
                  animationUp.addEventListener( "finish", selectByOffset );
                  // console.log( rightBoxWrapper.offsetTop );
            }
      }



}


