window.onload = initialice;


function initialice()
{
      document.onwheel = tellScroll;
      const rightBoxWrapper = document.querySelector( '.right-box-wrapper' );
      const rightBox = document.querySelector( '.right-box' );
      const maxShifting = rightBoxWrapper.clientHeight - rightBox.clientHeight;
      let currentScrollPos = 0;
      let velocityAcumulator = 0;

      let topicsProps = {
            lastShifted: null,
            lastShiftedParent: null,
            blink: function( current )
            {
                  current.classList.add('notransition');
                  current.style.backgroundColor = "rgba(214, 153, 182, 0.1)";
                  current.offsetHeight; // Trigger a reflow, flushing the CSS changes
                  current.classList.remove('notransition');
                  current.style.backgroundColor = "rgba( 0, 0, 0, 0.0 )";
            },
            shift: function( current )
            {
                  if( this.lastShifted ){
                        this.lastShifted.style.left = "0px";
                        this.colorMarkOff( this.lastShifted );
                        this.lastShiftedParent.addEventListener( "mouseleave", topicHoverOff );
                  }

                  current.removeEventListener( "mouseleave", topicHoverOff );
                  this.lastShiftedParent = current;
                  this.lastShifted = current.children[0];
                  this.lastShifted.style.left = "5%";
            },
            colorMarkOn: function ( child )
            {
                  child.style.color = "rgba(214, 153, 182, 1.0)";
            },
            colorMarkOff: function ( child )
            {
                  child.style.color = "#D3C6AA";
            },
      };

      // Execute function every 50ms
      var intervalId = window.setInterval( velocityDecrementFunction, 50);

      // clearInterval(intervalId) 


      // Hover
      const topics = document.querySelectorAll( '.topics' );
      const wrapperTopics = document.querySelectorAll( '.wrapper-topics' );

      console.log(topics);
      console.log(wrapperTopics);

      for( wt of wrapperTopics ){
            wt.addEventListener( "mouseenter", topicHoverOn );
            wt.addEventListener( "mouseleave", topicHoverOff );
            wt.addEventListener( "click", selectTopic);
      }

      function selectTopic(ev)
      {
            wt.addEventListener( "mouseleave", topicHoverOff );
            const current = ev.currentTarget;
            topicsProps.blink( current );
            topicsProps.shift( current );
      }

      function topicHoverOn(ev)
      {
            const child = ev.currentTarget.children[0];
            topicsProps.colorMarkOn( child );
      }

      function topicHoverOff(ev)
      {
            const child = ev.currentTarget.children[0];
            topicsProps.colorMarkOff( child );
      }

      function velocityDecrementFunction()
      {
            console.log( "velocity" + velocityAcumulator );
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
                  console.log( rightBoxWrapper.offsetTop );
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
                  console.log( rightBoxWrapper.offsetTop );
            } else {
                  console.log( rightBoxWrapper.offsetTop );
                  let amount = (currentScrollPos + velocityAcumulator) >= 0 ? 0 : (currentScrollPos + velocityAcumulator);
                  console.log( `Amount: ${amount}` );
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
                  console.log( rightBoxWrapper.offsetTop );
            }
      }
}

