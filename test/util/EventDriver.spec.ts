import EventDriver from '../../src/util/EventDriver';
import EventListener from '../../src/util/EventListener';

const enum GameEvent {
	U,
	A,
	B,
}

class Listener extends EventListener<unknown> {
	protected a = false;

	isTriggerable(): boolean {
		return this.a;
	}

	async process(): Promise<boolean> {
		return this.a;
	}
}

const driver = new EventDriver();
const l1 = new Listener(GameEvent.A);
const l2 = new Listener(GameEvent.B);
const l3 = new Listener(GameEvent.B);

const process2 = jest.spyOn(l2, 'process');
const process3 = jest.spyOn(l3, 'process');

it('registers 2 listeners', () => {
	driver.register(l1);
	driver.register(l2);
	driver.register(l3);
});

it('triggers GameEvent.A', async () => {
	const ret = await driver.trigger(GameEvent.A);
	expect(ret).toBe(true);
});

it('triggers event GameEvent.B', async () => {
	jest.spyOn(l2, 'isTriggerable').mockReturnValue(true);
	jest.spyOn(l3, 'isTriggerable').mockReturnValue(true);
	const data = { t: 3 };
	const ret = await driver.trigger(GameEvent.B, data);
	expect(ret).toBe(true);
	expect(process2).toBeCalledTimes(1);
	expect(process2).toBeCalledWith(data);
	expect(process3).toBeCalledTimes(1);
	expect(process3).toBeCalledWith(data);
	process2.mockClear();
	process3.mockClear();
});

it('triggers event GameEvent.B and can be stopped', async () => {
	process2.mockResolvedValue(true);
	const data = { t: 4 };
	const ret = await driver.trigger(GameEvent.B, data);
	expect(ret).toBe(true);
	expect(process2).toBeCalledTimes(1);
	expect(process2).toBeCalledWith(data);
	expect(process3).not.toBeCalled();
});

it('triggers event GameEvent.U', async () => {
	const ret = await driver.trigger(GameEvent.U);
	expect(ret).toBe(false);
});
