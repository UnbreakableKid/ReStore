import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import agent from "../../api/agent";
import { Basket } from "../../app/models/basket";
import { getCookie } from "../../app/util/util";

interface BasketState {
  basket: Basket | null;
  status: string;
}

const initialState: BasketState = {
  basket: null,
  status: "idle",
};

export const fetchBasketAsync = createAsyncThunk<Basket>(
  "basket/fetchBasketAsync",
  async (_, thunkAPI) => {
    try {
      return await agent.Basket.get();
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  },
  {
    condition: (state) => {
      if (!getCookie("buyerId")) return false;
    },
  }
);

export const addBasketItemAsync = createAsyncThunk<
  Basket,
  { productId: number; quantity: number }
>("basket/addBasketItemAsync", async ({ productId, quantity }, thunkAPI) => {
  try {
    return await agent.Basket.addItem(productId, quantity);
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data });
  }
});

export const removeBaskeItemAsync = createAsyncThunk<
  void,
  { productId: number; quantity: number; name?: string }
>("basket/removeBaskeItemAsync", async ({ productId, quantity }, thunkAPI) => {
  try {
    await agent.Basket.removeItem(productId, quantity);
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data });
  }
});

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    setBasket: (state, action) => {
      state.basket = action.payload;
    },
    clearBasket: (state) => {
      state.basket = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addBasketItemAsync.pending, (state, action) => {
      state.status = "pendingAddItem" + action.meta.arg.productId;
    });

    builder.addCase(removeBaskeItemAsync.pending, (state, action) => {
      state.status =
        "pendingRemoveItem" + action.meta.arg.productId + action.meta.arg.name;
    });

    builder.addCase(removeBaskeItemAsync.fulfilled, (state, action) => {
      const { productId, quantity } = action.meta.arg;
      const itemIndex = state.basket?.items.findIndex(
        (item) => item.productId === productId
      );

      if (itemIndex === -1 || itemIndex === undefined) return;
      state.basket!.items[itemIndex].quantity -= quantity!;

      if (state.basket!.items[itemIndex].quantity <= 0) {
        state.basket!.items.splice(itemIndex, 1);
      }
      state.status = "idle";
    });
    builder.addCase(removeBaskeItemAsync.rejected, (state) => {
      state.status = "idle";
    });

    builder.addMatcher(
      isAnyOf(addBasketItemAsync.fulfilled, fetchBasketAsync.fulfilled),
      (state, action) => {
        state.status = "idle";
        state.basket = action.payload;
      }
    );
    builder.addMatcher(
      isAnyOf(addBasketItemAsync.rejected, fetchBasketAsync.rejected),
      (state) => {
        state.status = "idle";
      }
    );
  },
});

export const { setBasket, clearBasket } = basketSlice.actions;
