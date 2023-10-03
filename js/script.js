window.onload = initialice;


function initialice()
{
      document.onwheel = tellScroll;
      const rightBoxWrapper = document.querySelector( '.right-box-wrapper' );
      const rightBox = document.querySelector( '.right-box' );
      const maxShifting = rightBoxWrapper.clientHeight - rightBox.clientHeight;
      let currentScrollPos = 0;
      let velocityAcumulator = 0;

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

                  console.log( "CURRENT" + i );
                  console.log( "lastSelected" + this.lastSelected );
                  console.log( "currentSelected" + this.currentSelected );

                  // If I have a previous selected element
                  if( this.lastSelected !== null ){ // Shift back
                        // Shift Back
                        this.topicsChildrenIndex[this.lastSelected].style.left = "0px";
                        // Deselect background
                        // this.lastSelected.classList.add('notransition');
                        this.topicsIndex[this.lastSelected].classList.add('notransition');
                        this.topicsIndex[this.lastSelected].style.backgroundColor = "#dbbc7f00";
                        this.topicsIndex[this.lastSelected].offsetHeight; // Trigger a reflow, flushing the CSS changes
                        this.topicsIndex[this.lastSelected].classList.remove('notransition');
                        this.topicsIndex[this.lastSelected].offsetHeight; // Trigger a reflow, flushing the CSS changes
                        this.topicsChildrenIndex[this.lastSelected].style.fontWeight = "400";
                        this.topicsChildrenIndex[this.lastSelected].style.color = "#D3C6AA";
                  }

                  // Shift 
                  this.topicsChildrenIndex[this.currentSelected].style.left = "5%";
                  // Select BG
                  this.topicsIndex[this.currentSelected].classList.add('notransition');
                  this.topicsIndex[this.currentSelected].style.backgroundColor = "#dbbc7f99";
                  this.topicsIndex[this.currentSelected].offsetHeight; // Trigger a reflow, flushing the CSS changes
                  this.topicsIndex[this.currentSelected].classList.remove('notransition');
                  this.topicsIndex[this.currentSelected].style.backgroundColor = "#dbbc7f33";
                  this.topicsChildrenIndex[this.currentSelected].style.fontWeight = "900";
                  this.topicsChildrenIndex[this.currentSelected].style.color = "#ffefcc";

                  // If ev is not null, the alignNBlink function is executed 
                  if( ev ){
                        // Once a Topic is selected, align and blink right topic section ( -> )
                        this.alignNBlink( null, i );
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
                        console.log( "Hola" );
                  if( !ev ){
                        // Move and Blink section ( without selecting topic )
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
                        );

                  } 
                  else {
                        if( true ){
                              if( this.currentSelected != i ){
                                    console.log( ev );
                                    // Blink Section ( select topic )
                                    this.topicSectionsIndex[this.currentSelected].classList.add('notransition');
                                    this.topicSectionsIndex[this.currentSelected].style.backgroundColor = "#dbbc7f99";
                                    this.topicSectionsIndex[this.currentSelected].offsetHeight; // Trigger a reflow, flushing the CSS changes
                                    this.topicSectionsIndex[this.currentSelected].classList.remove('notransition');
                                    this.topicSectionsIndex[this.currentSelected].style.backgroundColor = "#dbbc7f00";

                                    // Select TOpic
                                    this.select( null, i );
                              }
                        }

                  }
            }
      };

      // Execute function every 50ms
      var intervalId = window.setInterval( velocityDecrementFunction, 50);

      // clearInterval(intervalId) 


      // Hover
      const topics = document.querySelectorAll( '.topics' );
      const wrapperTopics = document.querySelectorAll( '.wrapper-topics' );

      // console.log(topics);
      // console.log(wrapperTopics);

      // Topics Listeners
      topicsProps.topicsIndex[0].addEventListener( "mouseenter", (ev)=>{ topicsProps.colorMarkOn( ev, 0 ); } );
      topicsProps.topicsIndex[0].addEventListener( "mouseleave", (ev)=>{ topicsProps.colorMarkOff( ev, 0 ); } );
      topicsProps.topicsIndex[0].addEventListener( "click", (ev)=>{ topicsProps.select( ev, 0 ); } );
      topicsProps.topicsIndex[1].addEventListener( "mouseenter", (ev)=>{ topicsProps.colorMarkOn( ev, 1 ); } );
      topicsProps.topicsIndex[1].addEventListener( "mouseleave", (ev)=>{ topicsProps.colorMarkOff( ev, 1 ); } );
      topicsProps.topicsIndex[1].addEventListener( "click", (ev)=>{ topicsProps.select( ev, 1 ); } );
      topicsProps.topicsIndex[2].addEventListener( "mouseenter", (ev)=>{ topicsProps.colorMarkOn( ev, 2 ); } );
      topicsProps.topicsIndex[2].addEventListener( "mouseleave", (ev)=>{ topicsProps.colorMarkOff( ev, 2 ); } );
      topicsProps.topicsIndex[2].addEventListener( "click", (ev)=>{ topicsProps.select( ev, 2 ); } );

      // Topic Sections Listeners
      // rightBoxWrapper.addEventListener( "scroll", (ev)=>{ topicsProps.alignNBlink( ev, 0 ); } );


      // function measureScrollMove( ev )
      // {
      //       if (document.documentElement.scrollTop > 50) {
      //             document.getElementById("myP").className = "test";
      //       } else {
      //             document.getElementById("myP").className = "";
      //       }
      // }
      // function selectTopic(ev)
      // {
            //       const current = ev.currentTarget;
            //       topicsProps.setLastAndCurrent( current );
            //       topicsProps.setLastAndCurrentSelected( current );
            //       topicsProps.blink();
            //       topicsProps.shift();
            //       topicsProps.colorMarkOn();
            // }
      //
            // function topicHoverOn(ev)
      // {
            //       const current = ev.currentTarget;
            //       topicsProps.setLastAndCurrent( current );
            //       topicsProps.colorMarkOn();
            // }
      //
            // function topicHoverOff(ev)
      // {
            //       const current = ev.currentTarget;
            //       topicsProps.setLastAndCurrent( current );
            //       topicsProps.colorMarkOff();
            // }

      function velocityDecrementFunction()
      {
            // console.log( "velocity" + velocityAcumulator );
            velocityAcumulator ? velocityAcumulator -= 120 : false;
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
            velocityAcumulator < 800 ? velocityAcumulator += 120 : false;

            if( ev.deltaY > 0 ){
                  // console.log( rightBoxWrapper.offsetTop );
                  // Limit the amount of shifting to keep the box in the display
                  let amount = (currentScrollPos - velocityAcumulator) > -(maxShifting) ? (currentScrollPos - velocityAcumulator) : -(maxShifting);
                  rightBoxWrapper.animate(
                        {
                              top: `${amount}px` // Scroll Up
                        },
                        {
                              duration: 800,
                              fill: "forwards",
                              easing: "ease",
                        }
                  );
                  // console.log( rightBoxWrapper.offsetTop );
            } else {
                  // console.log( rightBoxWrapper.offsetTop );
                  let amount = (currentScrollPos + velocityAcumulator) >= 0 ? 0 : (currentScrollPos + velocityAcumulator);
                  // console.log( `Amount: ${amount}` );
                  rightBoxWrapper.animate(
                        {
                              top: `${amount}px` // Scroll Up
                        },
                        {
                              duration: 800,
                              fill: "forwards",
                              easing: "ease",
                        }
                  );
                  // console.log( rightBoxWrapper.offsetTop );
            }
            if( currentScrollPos <= 0 && currentScrollPos > -500 )
                  topicsProps.alignNBlink( true, 0 );
            if( currentScrollPos < -500 && currentScrollPos > -1000 )
                  topicsProps.alignNBlink( true, 1 );
            if( currentScrollPos < -1000 && currentScrollPos > -1500 )
                  topicsProps.alignNBlink( true, 2 );
      }
}

