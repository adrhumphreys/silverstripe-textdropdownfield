<?php
declare(strict_types=1);

namespace AdrHumphreys\TextDropdownField;

use SilverStripe\Forms\DropdownField;
use SilverStripe\Forms\FieldGroup;
use SilverStripe\Forms\FormField;
use SilverStripe\Forms\TextField;

class TextDropdownField extends FieldGroup
{
    protected $schemaDataType = FormField::SCHEMA_DATA_TYPE_CUSTOM;

    protected $schemaComponent = 'TextDropdownField';

    /**
     * @var TextField
     */
    private $textField;

    /**
     * @var DropdownField
     */
    private $dropdownField;

    public function __construct(
        string $name,
        ?string $title = null,
        string $textRelation,
        string $dropdownRelation,
        array $dropdownSource
    ) {
        $fields = [
            $this->textField = TextField::create($textRelation),
            $this->dropdownField = DropdownField::create($dropdownRelation)
                ->setSource($dropdownSource)
        ];

        $this->setName($name)->setValue('');
        $this->addExtraClass('text-dropdown-field');
        parent::__construct($title, $fields);
    }

    public function getTextField(): TextField
    {
        return $this->textField;
    }

    public function getDropdownField(): DropdownField
    {
        return $this->dropdownField;
    }

    public function getSchemaStateDefaults()
    {
        $state = parent::getSchemaStateDefaults();
        $state['textField'] = $this->textField->getSchemaState();
        $state['dropdownField'] = $this->dropdownField->getSchemaState();
        return $state;
    }
}
