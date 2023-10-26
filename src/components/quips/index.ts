/**
 * Directory used for quips when Service Messages are displayed
 */
import SSS from "./SSS.svelte";
import Drop from "./Drop.svelte";
import Plugged from "./Plugged.svelte";
import Acrobats from "./Acrobats.svelte";
import RailGoods from "./RailGoods.svelte";

const all = [SSS, Drop, Plugged, Acrobats, RailGoods];

const getQuip = () => all[Math.floor(Math.random() * all.length)];
export default getQuip;