import LatinSquareModel from '../model/LatinSquare';
import { Request, Response } from 'express';

// Define the type for the LatinSquare document (based on its schema)
interface LatinSquareDocument {
    index: number;
    currentOrder: number[];
    updateOne: (update: { index: number; currentOrder: number[] }) => Promise<void>;
    findOne: () => Promise<LatinSquareDocument>;
}

const order1: number[] = [1, 2, 3, 4, 5, 6];
const order2: number[] = [2, 3, 4, 5, 6, 1];
const order3: number[] = [3, 4, 5, 6, 1, 2];
const order4: number[] = [4, 5, 6, 1, 2, 3];
const order5: number[] = [5, 6, 1, 2, 3, 4];
const order6: number[] = [6, 1, 2, 3, 4, 5];

function getOrder(index: number): number[] | undefined {
    switch (index) {
        case 1:
            return order1;
        case 2:
            return order2;
        case 3:
            return order3;
        case 4:
            return order4;
        case 5:
            return order5;
        case 6:
            return order6;
        default:
            return order2;
    }
}

export const updateLatinSquare = async (req: Request, res: Response): Promise<void> => {
    try {
        const ls = await LatinSquareModel.findOne() as LatinSquareDocument;
        let index = ls.index;
        let order = ls.currentOrder;

        index = index === 6 ? 1 : index + 1;
        order = getOrder(index) || order; 

        await ls.updateOne({
            index: index,
            currentOrder: order
        });

        const updatedLs = await LatinSquareModel.findOne() as LatinSquareDocument;
        res.status(200).json(updatedLs);
    } catch (err) {
        res.status(409).json({ message: (err as Error).message });
    }
};

export const getLatinSquare = async (req: Request, res: Response): Promise<void> => {
    try {
        const ls = await LatinSquareModel.findOne() as LatinSquareDocument;
        res.status(200).json(ls);
    } catch (err) {
        res.status(409).json({ message: (err as Error).message });
    }
};
