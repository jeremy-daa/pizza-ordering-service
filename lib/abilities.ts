import { Ability, AbilityBuilder } from "@casl/ability";

// Define what each role can do
export function defineAbilitiesFor(user: any) {
  const { can, cannot, rules } = createMongoAbility();

  if (user.role === "restaurant_manager") {
    can("manage", "Pizza"); // Can manage all pizzas
    can("manage", "Topping"); // Can manage all toppings
    can("read", "Order"); // Can view orders
    can("update", "Order"); // Can update order status
    can("manage", "User", `restaurantId:${user.restaurantId}`); // Can manage users in their restaurant
  }

  if (user.role === "customer") {
    can("read", "Pizza"); // Can browse pizzas
    can("create", "Order"); // Can place orders
    can("read", "Order", `userId:${user.id}`); // Can see their own order history
  }
  return createMongoAbility(rules);
}
