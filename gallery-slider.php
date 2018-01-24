<?php
/**
* Plugin Name:  Gallery Slider
* Plugin URI:   https://github.com/mikejandreau/gallery-slider
* Description:  Plugin to display recent gallery excerpts as a slideshow. Simply add [gallery_slider] to the content area in WordPress.
* Version:      1.0
* Author:       Mike Jandreau
* Author URI:   https://www.mikejandreau.net/
* Text Domain:  gallery slider
* Licence:      GNU General Public License v2
*
*/



/**
 * SET GALLERY LINKS TO MEDIA FILE
 * Ensures photo gallery media items will trigger lightbox when clicked
 */
function baseinstall_set_gallery_links($out, $pairs, $atts) {
    $atts = shortcode_atts( array( 
        'link' => 'file' 
        ), $atts );
    $out['link'] = $atts['link'];
    return $out;
}
add_filter('shortcode_atts_gallery', 'baseinstall_set_gallery_links', 10, 3);





// Register styles and scripts
function gallery_slider_assets() {
    wp_register_style('gallery_slider_styles', plugins_url('assets/css/gallery.min.css',__FILE__ ));
    wp_enqueue_style('gallery_slider_styles');

    wp_register_script( 'gallery_slider_scripts', plugins_url('assets/js/gallery.min.js', __FILE__), array(),'1.1', true);
    wp_enqueue_script('gallery_slider_scripts');
}
add_action( 'wp_enqueue_scripts','gallery_slider_assets');





/**
 * RESPONSIVE VIDEO EMBED
 * Filter for adding wrappers around embedded objects
 */
// function baseinstall_responsive_embeds( $content ) {
//     $content = preg_replace( "/<object/Si", '<div class="video-container"><object', $content );
//     $content = preg_replace( "/<\/object>/Si", '</object></div>', $content );
    
//     // Added iframe filtering for embedded YouTube/Vimeo videos.
//     $content = preg_replace( "/<iframe.+?src=\"(.+?)\"/Si", '<div class="video-container"><iframe src="\1" frameborder="0" allowfullscreen>', $content );
//     $content = preg_replace( "/<\/iframe>/Si", '</iframe></div>', $content );
//     return $content;
// }
// add_filter( 'the_content', 'baseinstall_responsive_embeds' );




?>