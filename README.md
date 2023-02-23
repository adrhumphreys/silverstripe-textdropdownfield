# Text dropdown field

This lets you add field that is a combination of a dropdown and a text field
![](./example.png)

## Requirements

* PHP ^7.4 || ^8.0
* SilverStripe ^4.0 || ^5

## Installation
```
composer require adrhumphreys/silverstripe-textdropdownfield dev-master
```

## Documentation
When using this field you'll need to specify the name of the field, the title for the field, the text relation, the dropdown relation followed by the dropdown source.

An example usecase could look like this:

```php
<?php
declare(strict_types=1);

use AdrHumphreys\TextDropdownField\TextDropdownField;
use SilverStripe\ORM\DataObject;

class Example extends DataObject
{
    /**
     * @var string[]
     */
    private static $db = [
        'TextContent' => 'Varchar(20)',
        'DropdownContent' => 'Varchar(20)',
    ];

    public function getCMSFields()
    {
        $fields = parent::getCMSFields();

        $source = [
            'p' => 'Paragraph',
            'h1' => 'Header 1',
            'h2' => 'Header 2',
        ];

        $fields->addFieldToTab(
            'Root.Main',
            TextDropdownField::create(
                'NameThatDoesntMatter',
                'Title',
                'TextContent',
                'DropdownContent',
                $source
        ));

        return $fields;
    }
}
```

If you want to specifically edit the dropdown or text field you can access those through `getTextField` and `getDropdownField` on the field after it's been created

## Maintainers
 * Adrian <adrhumphreys@gmail.com>

## Development and contribution
Smash that PR button 🥰
