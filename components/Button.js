//
// Imports
//

import { DE } from "@donutteam/document-builder";

/**
 * @typedef {import("@donutteam/document-builder").DocumentElement} DocumentElement
 */

//
// Component
//

/**
 * @typedef {Object} ButtonOptions
 * @property {String|Array<String>} [classes] Any additional class[es] for the button.
 * @property {String} [href] An href for the button. Optional.
 * @property {Boolean} [external] Whether or not the button links to an external site. This adds an extra icon to the button. Optional, defaults to false.
 * @property {String} [target] The target of a link button. Optional, defaults to "_blank" for external links and "_self" for non-external ones.
 * @property {"before"|"after"} [iconPosition] The position of the icon. Optional, defaults to "before".
 * @property {"font-awesome"|"image"} [iconType] The type of icon to use. Optional, defaults to "font-awesome".
 * @property {String} [iconName] The name of the icon to use.
 * @property {String} [text] Text for the button.
 */

/**
 * Instantiates a new button DocumentElement.
 * 
 * @param {ButtonOptions} options Options for the button.
 * @returns {DocumentElement} A DocumentElement.
 */
export function Button(options)
{
	// TODO: I haven't decided if this component should be responsible for HTML entitizing things or if the service using it should be

	//
	// Default Options
	//

	if (options == null)
	{
		options = {};
	}

	if (options.classes == null)
	{
		options.classes = [];
	}

	if (options.external == null)
	{
		options.external = false;
	}

	if (options.target == null)
	{
		options.target = options.external ? "_blank" : "_self";
	}

	if (options.iconPosition == null)
	{
		options.iconPosition = "before";
	}

	if (options.iconType == null)
	{
		options.iconType = "font-awesome";
	}

	//
	// Converting Option Types
	//

	if (options.classes != null)
	{
		if (!Array.isArray(options.classes))
		{
			options.classes = [ options.classes ];
		}
	}

	//
	// Create Button
	//

	let icon = null;

	if (options.iconName != null)
	{
		switch (options.iconType)
		{
			case "font-awesome":
			default:
				icon = new DE("span", `fa-fw ${ options.iconName } mr-2`);

				break;

			case "image":
				icon = new DE("img",
					{
						class: "fa-fw mr-2", // Kind of a HACK
						src: options.iconName,
						alt: "Button Icon",
					});

				break;
		}
	}

	return new DE(options.href != null ? "a" : "button",
		{
			class:
			[
				...options.classes,
				"inline-block",
				"p-2",
				"rounded-xl",
				"bg-primary",
				"hover:bg-secondary",
				"text-white",
			],
			href: options.href,
			target: options.href != null ? options.target : null,
		},
		[
			options.iconPosition == "before" ? icon : null,
			options.text != null ? new DE("span", null, options.text) : null,
			options.iconPosition == "after" ? icon : null,
			options.external ? new DE("span", "fa-fw fa-thin fa-arrow-up-right-from-square ml-2") : null,
		]);
}