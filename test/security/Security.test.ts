import 'jest';
import { IAppContext } from '../../src/core/IAppContext';
import {
    authorize,
    AuthorizePermissionOptions,
    ISecurityClaim,
    ISecurityProvider,
    SecurityException,
    SecurityManager,
} from '../../src/security';
import { ColorUtils } from '../../src/utils/index';

// jest.resetAllMocks();
// jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

// tslint:disable:no-empty
beforeAll(() => {
    const sp = new DummpySprovider();
    SecurityManager.registerSecurityProviders(sp.name, sp);
});

beforeEach(() => {});

afterAll(() => {});

afterEach(() => {});

describe('Security', () => {
    it('checks authorize decorator', async () => {
        expect.assertions(2);
        const dm = new DummyClass();
        const actual1 = await dm.testfn1('saeed');
        const actual2 = await dm.testfn2();
        expect(actual1).toEqual('saeed');
        expect(actual2).toEqual('task2');
    });
});

class DummyClass {
    public get context() {
        return { user: { isAuthenticated: true } };
    }
    @authorize()
    public async testfn1(fname: string) {
        return fname;
    }
    @authorize({ roles: ['admin'] })
    public async testfn2() {
        return 'task2';
    }
}
class DummpySprovider implements ISecurityProvider {
    public hasAllPermissions(options: AuthorizePermissionOptions): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    public hasAnyPermissions(options: AuthorizePermissionOptions): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    public exceptPermissions(options: AuthorizePermissionOptions): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    public hasAllClaims(...claims: ISecurityClaim[]): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    public hasAnyClaims(...claims: ISecurityClaim[]): Promise<boolean> {
        const context = (this as any).context as IAppContext<any>;

        if (!context) {
            return Promise.reject(new SecurityException(-4005, 'Application context not defined'));
        }
        const user = context.user;
        if (!user) {
            return Promise.reject(new SecurityException(-4006, 'Application context user not defined'));
        }
        if (!user.isAuthenticated) {
            return Promise.reject(new SecurityException(-4007, 'User not authenticated'));
        }
        return Promise.resolve(true);
    }
    public exceptClaims(...claims: ISecurityClaim[]): Promise<boolean> {
        const conext = (this as any).context;
        throw new Error('Method not implemented.');
    }

    public get name() {
        return 'DummySecurityProvider';
    }
}
