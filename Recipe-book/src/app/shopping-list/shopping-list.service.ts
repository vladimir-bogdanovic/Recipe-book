import { Subject } from "rxjs";
import { Ingridient } from "../shared/ingridient.model";


export class ShoppingListService {
    ingridientsChanged = new Subject<Ingridient[]>()

  private ingridients: Ingridient[] = [
        new Ingridient('apples', 5),
        new Ingridient('tomatoes', 10),
      ];

      getIngridient(){
        return this.ingridients.slice()
      }
      addIngridient (ingridient: Ingridient){
        this.ingridients.push(ingridient);
        this.ingridientsChanged.next(this.ingridients.slice())
      }

      addIngredients(ingridients : Ingridient[]) {
        // for (let ingridient of ingridients){
        //   this.addIngridient(ingridient)
        // }
        this.ingridients.push(...ingridients);
        this.ingridientsChanged.next(this.ingridients.slice())

      }
}