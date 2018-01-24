<?php
/**
* Plugin Name:  BaguetteBox.js for WordPress
* Plugin URI:   https://github.com/mikejandreau/baguetteBox-WP
* Description:  Simple and easy to use lightbox script written in pure JavaScript, adapted for WordPress.
* Version:      1.0
* Author:       Mike Jandreau
* Author URI:   https://www.mikejandreau.net/
* Text Domain:  gallery slider
* Licence:      GNU General Public License v2
*
*/

/**
* Set gallery links to media file, ensuring items will trigger lightbox when clicked
*/
function baguettebox_set_gallery_links($out, $pairs, $atts) {
    $atts = shortcode_atts( array( 
        'link' => 'file' 
        ), $atts );
    $out['link'] = $atts['link'];
    return $out;
}
add_filter('shortcode_atts_gallery', 'baguettebox_set_gallery_links', 10, 3);

/**
* Register styles and scripts
*/
function baguettebox_assets() {
    wp_register_style('baguettebox_styles', plugins_url('assets/css/baguetteBoxWP.min.css',__FILE__ ));
    wp_enqueue_style('baguettebox_styles');

    wp_register_script( 'baguettebox_scripts', plugins_url('assets/js/baguetteBoxWP.min.js', __FILE__), array(),'1.1', true);
    wp_enqueue_script('baguettebox_scripts');
}
add_action( 'wp_enqueue_scripts','baguettebox_assets');
?>