<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/REC-html40/loose.dtd">
<html><body><p>/**
 * WooCommerce quantity buttons.
 *
 * @since x.x.x
 */

window.addEventListener( "load", function(e) {
    astrawpWooQuantityButtons();
    quantityInput();
});


// Here we are selecting the node that will be observed for mutations.
const astraminiCarttargetNodes = document.querySelectorAll(".ast-site-header-cart");

astraminiCarttargetNodes.forEach(function(astraminiCarttargetNode) {
    if (astraminiCarttargetNode != null) {
        const config = { attributes: false, childList: true, subtree: true };
    
        const astraMinicartObserver = () =&gt; {
            astrawpWooQuantityButtons();
            quantityInput();
        };
    
        const observer = new MutationObserver(astraMinicartObserver);
        observer.observe(astraminiCarttargetNode, config);
    }
});

/**This comment explains that in order to refresh the wc_fragments_refreshed event when an AJAX call is made, jQuery is used to update the quantity button.
 * Here plain JavaScript may not be able to trigger the wc_fragments_refreshed event in the same way,
 * hence the need to use jQuery
*/
jQuery( function( $ ) {
    $( document.body ).on( 'wc_fragments_refreshed', function() {
        astrawpWooQuantityButtons();
        quantityInput();
    });
});

(function() {
    // Delay the method override so that we do not interfere with the Metrix test.
    setTimeout(() =&gt; {
        var send = XMLHttpRequest.prototype.send
        XMLHttpRequest.prototype.send = function() {
            this.addEventListener('load', function() {
                astrawpWooQuantityButtons();
            })
            return send.apply(this, arguments)
        }
    }, 2000);
})();

/**
 * Astra WooCommerce Quantity Buttons.
 */
function astrawpWooQuantityButtons( $quantitySelector ) {

    var $cart = document.querySelector( '.woocommerce div.product form.cart' );

    if ( ! $quantitySelector ) {
        $quantitySelector = '.qty';
    }

    $quantityBoxesWrap = document.querySelectorAll( 'div.quantity:not(.elementor-widget-woocommerce-cart .quantity):not(.buttons_added), td.quantity:not(.elementor-widget-woocommerce-cart .quantity):not(.buttons_added)' );

    for ( var i = 0; i ${ astra_qty_btn.minus_qty }<a href="javascript:void(0)" id="minus_qty-${ i }" class="minus %s">-</a>`;
            const plusBtn = `<span class="screen-reader-text">${ astra_qty_btn.plus_qty }</span><a href="javascript:void(0)" id="plus_qty-${ i }" class="plus %s">+</a>`;

            if ( 'vertical-icon' === astra_qty_btn.style_type ) {
                $qty_parent.classList.add( 'ast-vertical-style-applied' );
                $quantityBoxes.classList.add( 'vertical-icons-applied' );
                $qty_parent.insertAdjacentHTML(
                    'beforeend',
                    minusBtn.replace( '%s', 'ast-vertical-icon' ) + plusBtn.replace( '%s', 'ast-vertical-icon' )
                );
            } else {
                let styleTypeClass = '';
                if ( 'no-internal-border' === astra_qty_btn.style_type ) {
                    $quantityBoxes.classList.add( 'ast-no-internal-border' );
                    styleTypeClass = 'no-internal-border';
                }
                $qty_parent.insertAdjacentHTML( 'afterbegin', minusBtn.replace( '%s', styleTypeClass ) );
                $qty_parent.insertAdjacentHTML( 'beforeend', plusBtn.replace( '%s', styleTypeClass ) );
            }
            $quantityEach = document.querySelectorAll( 'input' + $quantitySelector + ':not(.product-quantity)' );

            for ( var j = 0; j  0 &amp;&amp; parseFloat( el.value )  Number( $maxQuantity ) ) ) {
                            $quantityBox.value = $maxQuantity;
                        } else {
                            finalValue = $currentQuantity + parseFloat( $step );
                            $quantityBox.value = checkStepInteger ? finalValue : ( finalValue ).toFixed(1);
                        }

                    } else {

                        if ( $minQuantity &amp;&amp; ( $minQuantity === $currentQuantity || $currentQuantity  0 ) {
                            finalValue = $currentQuantity - parseFloat( $step );
                            $quantityBox.value = checkStepInteger ? finalValue : ( finalValue ).toFixed(1);
                        }

                    }

                    // Trigger the change event on the input.
                    var changeEvent = new Event('change', { bubbles: true });
                    $quantityBox.dispatchEvent(changeEvent);

                    // Trigger change event.
                    var update_cart_btn = document.getElementsByName("update_cart");
                    if (update_cart_btn.length &gt; 0) {
                        for ( var btn = 0; btn  {
                        miniCart.classList.remove('ajax-mini-cart-qty-loading');
                    }, 500);
                   

                    if ( typeof wc_add_to_cart_params === 'undefined' ) {
                        return;
                    }
                }
            }
        };
    }

}



let typingTimer; //timer identifier
let doneTypingInterval = 500;

function quantityInput() {
    const quantityInputContainer = document.querySelector('.woocommerce-mini-cart');

    if( quantityInputContainer ) {
        const quantityInput = document.querySelectorAll('.input-text.qty');

        quantityInput.forEach( single =&gt; {
            single.addEventListener('keyup', (e) =&gt; {
                if ( e.key === 'Tab' || e.keyCode === 9 ) {
                    return;
                }
                clearTimeout(typingTimer);
                if (single.value) {
                    typingTimer = setTimeout(() =&gt; {
                        const quantity = e.target.value;
                        const itemHash = e.target.getAttribute('name').replace(/cart\[([\w]+)\]\[qty\]/g, '$1');

                        if( quantity ) {
                            sendAjaxQuantityRequest(e.target, quantity,itemHash);
                        }
                    }, doneTypingInterval);
                }
            });
        });
    }
}</p></body></html>
