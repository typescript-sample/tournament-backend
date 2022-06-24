import { Controller, Log } from 'express-ext';
import { Players, PlayerFilter, PlayerService } from './player';

export class PlayerController extends Controller<Players, string, PlayerFilter> {
    constructor(log: Log, PlayerService: PlayerService) {
        super(log, PlayerService);
    }
}
