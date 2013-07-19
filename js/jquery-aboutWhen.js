/**
 * aboutWhen:  A jQuery UI widget plugin for accepting
 *             partial or approximate date information.
 * http://talerian.com/scripts/aboutWhen.html
 *
 * @name       hshAboutWhen jQuery Plugin
 * @author     Harold S. Henry <harold@talerian.com>
 * @version    0.1.0
 *
 * @requires jQuery
 *
 * Copyright (c) 2013 by Harold S. Henry
 * Dual licensed under the MIT and GPL licenses.
 * Uses the same license as jQuery, see:
 * http://docs.jquery.com/License
 */
( function( $ ) {
  $.fn.aboutWhen = function( settings ) {
    return this.each( function( settings ) {
      var text = ( ( settings ) &&
                   ( settings.text ) ) ?
                  settings.text : {
                    Nm: [ "(year)", "(month)", "(day)", "(weekday)" ],
                    Mo: [ "January", "February", "March",
                          "April", "May", "June",
                          "July", "August", "September",
                          "October", "November", "December" ],
                    Wd: [ "Sunday", "Monday", "Tuesday", "Wednesday",
                           "Thursday", "Friday", "Saturday" ],
                    ns: "(not sure)"
                  },
          wdth = ( ( settings ) &&
                   ( settings.widths ) ) ?
                  settings.widths : [ "80px", "120px", "70px", "125px" ];
          minY = ( ( settings ) &&
                   ( settings.minY ) &&
                   ( settings.minY > 1800 ) &&
                   ( settings.minY < 2050 ) ) ?
                  settings.minY : 1900,
          maxY = ( ( settings ) &&
                   ( settings.maxY ) &&
                   ( settings.maxY > 0 ) &&
                   ( settings.maxY < 2060 ) ) ?
                  settings.maxY : new Date( ).getFullYear( ),
          bId = this.id + "_",
          i = 0,
          sel = null,
          opt = null,
          lbl = null,
          
          _bldS = function( sId, wid ) {
            var sel = document.createElement( "select" ),
                opt = document.createElement( "option" );
            sel.id = sId;
            sel.name = sel.id;
            sel.className = 'hsh-when-S';
            sel.onfocus = hideLabel;
            sel.onblur = showLabel;
            sel.onchange = chg;
            opt.setAttribute( "value", -1 );
            opt.innerHTML = "";
            sel.appendChild( opt );
            $(sel).css( { "width" : wid } );
            return sel;
          },
          
          _bldL = function( lId, lNm, pos ) {
            var lbl = document.createElement( "label" );
            lbl.setAttribute( "id", lId );
            lbl.className = 'hsh-when-L';
            lbl.innerHTML = lNm;
            $( lbl ).css( {
              'left' : pos.left,
              'top' : pos.top
            } );
            return lbl;
          },
          
          chg = function ( ) {
            var pId = '#' + this.id.substr( 0, this.id.length - 1 ),
                yS = $( pId + "y" )[0],
                mS = $( pId + "m" )[0],
                dS = $( pId + "d" )[0],
                y = yS.options[yS.selectedIndex].value,
                ly = ( ( y > 0 ) &&
                       ( y % 4 == 0 ) &&
                       ( y % 100 != 0 ) ),
                m = mS.selectedIndex,
                md = 31,
                d = dS.selectedIndex,
                dt = null;
                
            if( m > 0 ) {
              if( m < 9 ) {
                if( m == 2 ) {
                  md = ( ly ) ? 29 : 28;
                } else {
                  md = ( m & 1 ) ? 31 : 30;
                }
              } else {
                md = ( m & 1 ) ? 30 : 31;
              }
            }
            if( d > md ) {
              d = md;
              dS.selectedIndex = md;
            }
            if( ( y > 0 ) && ( m > 0 ) && ( d > 0 ) ) {
              dt = new Date( y, m, d );
              if( dt ) {
                $( pId + "w" )[0].selectedIndex = dt.getDay( ) + 1;
                $( pId + "wL" ).hide( );
              }
            }
          },
          
          hideLabel = function( ) {
            this.options[0].innerHTML = text.ns;
            $('#' + this.id + 'L').hide( );
          },
          
          showLabel = function( ) {
            this.options[0].innerHTML = "";
            var $L = $('#' + this.id + 'L');
            if( this.selectedIndex > 0 )
              $L.hide( );
            else
              $L.show( );
          };
         
      if( maxY < minY )
        maxY = minY;
        
      // Create the year <select>
      sel = _bldS( bId + "y", wdth[0] );
      for( i = maxY; i >= minY; i-- ) {
        opt = document.createElement( "option" );
        opt.setAttribute( "value", i );
        opt.innerHTML = "&#160;" + i;
        sel.appendChild( opt );
      }
      this.appendChild( sel );
      
      // Create the year label
      lbl = _bldL( bId + "yL", text.Nm[0], $( sel ).position( ) );
      this.appendChild( lbl );

      // Create the Month <select>
      sel = _bldS( bId + "m", wdth[1] );
      for( i = 0; i < 12; i++ ) {
        opt = document.createElement( "option" );
        opt.setAttribute( "value", i );
        opt.innerHTML = "&#160;" + text.Mo[i];
        sel.appendChild( opt );
      }
      this.appendChild( sel );
      
      // Create the month label
      lbl = _bldL( bId + "mL", text.Nm[1], $( sel ).position( ) );
      this.appendChild( lbl );

      // Create the Day <select>
      sel = _bldS( bId + "d", wdth[2] );
      for( i = 1; i < 10; i++ ) {
        opt = document.createElement( "option" );
        opt.setAttribute( "value", i );
        opt.innerHTML = "&#160;&#160;&#160;&#160;" + i;
        sel.appendChild( opt );
      }
      for( i = 10; i < 32; i++ ) {
        opt = document.createElement( "option" );
        opt.setAttribute( "value", i );
        opt.innerHTML = "&#160;&#160;&#160;" + i;
        sel.appendChild( opt );
      }
      this.appendChild( sel );
      
      // Create the day label
      lbl = _bldL( bId + "dL", text.Nm[2], $( sel ).position( ) );
      this.appendChild( lbl );

      // Create the Day-of-the-week <select>
      sel = _bldS( bId + "w", wdth[3] );
      for( i = 0; i < 7; i++ ) {
        opt = document.createElement( "option" );
        opt.setAttribute( "value", i );
        opt.innerHTML = "&#160;" + text.Wd[i];
        sel.appendChild( opt );
      }
      this.appendChild( sel );   
      
      // Create the day-of-the-week label
      lbl = _bldL( bId + "wL", text.Nm[3], $( sel ).position( ) );
      this.appendChild( lbl );
    });
  };
})( jQuery );

