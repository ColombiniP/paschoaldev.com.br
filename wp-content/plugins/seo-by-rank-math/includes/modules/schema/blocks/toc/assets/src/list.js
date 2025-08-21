<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/REC-html40/loose.dtd">
<html><body><p>/**
 * External dependencies
 */
import { isEmpty } from 'lodash'

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n'
import { Button, TextControl } from '@wordpress/components'
import { RichText } from '@wordpress/block-editor'

export default function List( { headings = {}, onHeadingUpdate = {}, edit = {}, toggleEdit = {}, hideHeading = {}, ListStyle = 'ul', isSave = false } ) {
	if ( isEmpty( headings ) ) {
		return null
	}

	return (
		
			{ headings.map( ( heading ) =&gt; {
				if ( isSave &amp;&amp; heading.heading.disable ) {
					return false
				}

				const { content, link, disable, key } = heading.heading
				const TagName = 'div' === ListStyle ? 'div' : 'li'
				return (
					<tagname key="{" classname="{" disable :>
						{
							isSave &amp;&amp;
							<a href="/wp-content/plugins/seo-by-rank-math/includes/modules/schema/blocks/toc/assets/src/%7B" link>
								{ content }
							</a>
						}
						{
							! isSave &amp;&amp;
							<richtext tagname="a" value="{" content allowedformats="{" onchange="{" newcontent> onHeadingUpdate( newContent, key, true ) }
								placeholder={ __( 'Heading text', 'rank-math' ) }
							/&gt;
						}
						{
							heading.children &amp;&amp;
							<liststyle>
								<list headings="{" heading.children onheadingupdate="{" edit="{" toggleedit="{" hideheading="{" liststyle="{" issave="{"></list>
							</liststyle>
						}
						{
							key === edit &amp;&amp;
							<textcontrol placeholder="{" __ link value="{" onchange="{" newlink> onHeadingUpdate( newLink, key ) }
							/&gt;
						}
						{
							! isSave &amp;&amp;
							<span classname="rank-math-block-actions">
								<button icon="{" edit="==" key : classname="rank-math-item-visbility" onclick="{"> toggleEdit( edit === key ? false : key ) }
									title={ __( 'Edit Link', 'rank-math' ) }
								/&gt;

								<button classname="rank-math-item-delete" icon="{" disable : onclick="{"> hideHeading( ! disable, key ) }
									title={ __( 'Hide', 'rank-math' ) }
								/&gt;
							</button></button></span>
						}
					</textcontrol></richtext></tagname>
				)
			} ) }
		&gt;
	)
}
</p></body></html>
