import {CACHE_MANAGER, Inject, Injectable} from '@nestjs/common';
import { OnEvent } from "@nestjs/event-emitter";
import {Cache} from 'cache-manager';

@Injectable()
export class EmitterService {
    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

    @OnEvent('proxy_is_down')
    async listentToEvent(msg: string) {
        console.log('Message Received: ', msg)
    }
}
