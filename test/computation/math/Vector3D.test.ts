import 'jest';
import { Matrix, Vector3D } from '../../../src/computation/index';

// jest.resetAllMocks();
// jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

// tslint:disable:no-empty
beforeAll(() => {});

beforeEach(() => {});

afterAll(() => {});

afterEach(() => {});

describe('Computation', () => {
    describe('Math', () => {
        describe('Vector3D', () => {
            it('checks add', async () => {
                expect.assertions(3);
                const vec1 = new Vector3D(1, 2, 3);
                const vec2 = new Vector3D(1, 2, 3);
                const vec3 = vec1.add(vec2);
                expect(vec3.X).toEqual(2);
                expect(vec3.Y).toEqual(4);
                expect(vec3.Z).toEqual(6);
            });
            it('checks dot', async () => {
                expect.assertions(1);
                const vec1 = new Vector3D(1, 2, 3);
                const vec2 = new Vector3D(1, 2, 3);
                const vec3 = vec1.dot(vec2);
                expect(vec3).toEqual(14);
            });
            it('checks cross', async () => {
                expect.assertions(3);
                const vec1 = new Vector3D(1, 2, 3);
                const vec2 = new Vector3D(4, 5, 6);
                const vec3 = vec1.cross(vec2);
                expect(vec3.X).toEqual(-3);
                expect(vec3.Y).toEqual(6);
                expect(vec3.Z).toEqual(-3);
            });
            it('checks angleTo', async () => {
                expect.assertions(1);
                const vec1 = new Vector3D(1, 2, 3);
                const vec2 = new Vector3D(4, 5, 6);
                const vec3 = vec1.angleTo(vec2);
                expect(vec3).toEqual(0.2257261285527342);
            });
        });
    });
});
