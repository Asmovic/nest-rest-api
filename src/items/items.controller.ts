import { Controller, Get, Post, Put, Delete, Body, Req, Res, Param, ValidationPipe, UsePipes, ParseIntPipe, Query, ParseBoolPipe, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item-dto';
import { ItemsService } from './items.service';
import { Item } from './interfaces/item.interface';
import { ValidateCreateUserPipe } from './pipes/validate-create-user.pipe';
import { AuthGuard } from './guards/auth.guard';

@Controller('items')
@UseGuards(AuthGuard)
export class ItemsController {
    constructor(private readonly itemsService: ItemsService) {}
    
    @Get()
    /* findAll(@Query('sortDesc', ParseBoolPipe) sortDesc: boolean):Promise<Item[]> { */
    findAll():Promise<Item[]> {
        return this.itemsService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id):Promise<Item> {
        const item = this.itemsService.findOne(id)

        if(!item) {
            throw new HttpException('Item not found', HttpStatus.BAD_REQUEST)
        }

        return item;
    }

    @Post()
    @UsePipes(new ValidationPipe())
    create(@Body(ValidateCreateUserPipe) createItemDto : CreateItemDto):Promise<Item> {
        return this.itemsService.create(createItemDto);
    }

    @Delete(':id')
    delete(@Param('id') id:string): Promise<Item> {
        return  this.itemsService.delete(id)
    }

    @Put(':id')
    update(@Param('id') id, @Body() updateItemDto : CreateItemDto):Promise<Item> {
        return this.itemsService.update(id, updateItemDto)
    }
}
