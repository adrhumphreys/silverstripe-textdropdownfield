import Injector from 'lib/Injector';
import TextDropdownField from '../components/TextDropdownField';

export default () => {
  Injector.component.registerMany({
    TextDropdownField,
  });
};
