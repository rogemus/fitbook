import {renderComponent, expect} from '../../test_helper';
import Sidebar from '../../../src/components/common/sidebar';

describe('Sidebar', () => {
    it('Shows title for sidebar', () => {
        const component = renderComponent(Sidebar);
        expect(component).to.contain('Fitbook');
    });
});
