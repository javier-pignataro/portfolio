window.onload = initialice;


function initialice()
{
      // document.onwheel = tellScroll;
      window.addEventListener( "wheel", tellScroll );
      const rightBoxWrapper = document.querySelector( '.right-box-wrapper' );
      const rightBox = document.querySelector( '.right-box' );
      const maxShifting = rightBoxWrapper.clientHeight - rightBox.clientHeight;
      let currentScrollPos = 0;
      let velocityAcumulator = 0;
      let scrollingWindowTimer = 0;

      // Constants for topicsProps Object
      const topic0 = document.getElementById( "about-topic" );
      const topic1 = document.getElementById( "experience-topic" );
      const topic2 = document.getElementById( "projects-topic" );
      const section0 = document.querySelector( ".about-section" );
      const section1 = document.querySelector( ".experience-section" );
      const section2 = document.querySelector( ".projects-section" );

      let topicsProps = {
            current: null,
            last: null,
            currentSelected: null,
            lastSelected: null,

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
                        this.topicsIndex[this.lastSelected].style.backgroundColor = "#dbbc7f00";
                        this.topicsIndex[this.lastSelected].offsetHeight; // Trigger a reflow, flushing the CSS changes
                        this.topicsChildrenIndex[this.lastSelected].style.fontWeight = "400";
                        this.topicsChildrenIndex[this.lastSelected].style.color = "#D3C6AA";
                  }

                  // Shift 
                  this.topicsChildrenIndex[this.currentSelected].style.left = "5%";
                  // Select BG
                  // this.topicsIndex[this.currentSelected].classList.add('notransition');
                  this.topicsIndex[this.currentSelected].style.transition = "none";
                  this.topicsIndex[this.currentSelected].style.backgroundColor = "#dbbc7f99";
                  this.topicsIndex[this.currentSelected].offsetHeight; // Trigger a reflow, flushing the CSS changes
                  this.topicsIndex[this.currentSelected].style.transition = "background-color 0.5s ease-in";
                  this.topicsIndex[this.currentSelected].style.backgroundColor = "#dbbc7f33";
                  this.topicsChildrenIndex[this.currentSelected].style.fontWeight = "900";
                  this.topicsChildrenIndex[this.currentSelected].style.color = "#ffefcc";

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
                        this.topicsChildrenIndex[this.current].style.color = "#ffefcc";
                  }
            },

            colorMarkOff: function ( ev, i )
            {
                  if( this.current !== this.currentSelected ) {
                        this.topicsChildrenIndex[this.current].style.fontWeight = "400";
                        this.topicsChildrenIndex[this.current].style.color = "#D3C6AA";
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
                              this.topicSectionsIndex[this.lastSelected].style.backgroundColor = "#dbbc7f00";
                        }

                        // current selected --> < i >
                        this.topicSectionsIndex[this.currentSelected].style.transition = "none";
                        this.topicSectionsIndex[this.currentSelected].offsetHeight; // Trigger a reflow, flushing the CSS changes
                        this.topicSectionsIndex[this.currentSelected].style.backgroundColor = "#dbbc7f33";
                        this.topicSectionsIndex[this.currentSelected].offsetHeight; // Trigger a reflow, flushing the CSS changes
                        this.topicSectionsIndex[this.currentSelected].style.transition = "background-color 0.5s ease-in";
                        this.topicSectionsIndex[this.currentSelected].offsetHeight; // Trigger a reflow, flushing the CSS changes
                        this.topicSectionsIndex[this.currentSelected].style.backgroundColor = "#dbbc7f00";

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
      let scrollingInertiaInterval = window.setInterval( velocityDecrementFunction, 50);
      let scrollingTimingInterval = window.setInterval( scrollingWindow, 1000);

      console.log( section0 );
      // section0.style.backgroundColor = "#dbbc7f99";

      // Hover
      const topics = document.querySelectorAll( '.topics' );
      const wrapperTopics = document.querySelectorAll( '.wrapper-topics' );

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

      // Callback for the changes in the RightBoxWrapper Y-Offset
      //
            //

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

      let animationUp = null;
      let animationDown = null;

      function tellScroll(ev)
      {
            // The actual Y-Offset of the right box 
            currentScrollPos = rightBoxWrapper.offsetTop;
            console.log( currentScrollPos );
            console.log( ev.deltaY );
            // Predetermine the total amount of Y-Offset to increment/decrement
            // let totalVelocity = velocityAcumulator + 120;
            // velocityAcumulator += 120;
            velocityAcumulator < 250 ? velocityAcumulator += 50 : false;

            // Remove Topics CLicks
            topicsProps.topicsIndex[0].removeEventListener( "click", clickOnTopics );
            topicsProps.topicsIndex[1].removeEventListener( "click", clickOnTopics );
            topicsProps.topicsIndex[2].removeEventListener( "click", clickOnTopics );

            // Start scrollingWindowTimer
            scrollingWindowTimer = 1;



            if( ev.deltaY > 0 ){
                  // console.log( rightBoxWrapper.offsetTop );
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

