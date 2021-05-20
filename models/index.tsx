const initialState: InitialStateTypes = {
  collection: {},
  ids: [],
  deal: {
    address: '',
    marketDealType: '',
    id: null,
    createdAt: '',
    customer: {
      id: null,
      fullName: null,
      email: null,
      phone: null,
    },
    agent: {
      id: null,
      fullName: null,
      email: null,
      phone: null,
    },
    totalPrice: 0,
    request: {
      propertyForm: {
        address: null,
        newPropertyMarketType: '',
        photos: [],
      },
      buyPropertyForm: {
        property: {
          propertyType: null,
          address: null,
          newPropertyMarketType: '',
          photos: [],
          globalListingId: null,
          daysOnMarket: null,
          bathroomsTotal: null,
          bedroomsTotal: null,
          description: '',
        },
      },
    },
  },
  meta: {
    totalCount: null,
    totalPages: null,
  },
};

const dealsSlice = createSlice({
  name: 'requests',
  initialState,
  reducers: {
    getDeals(_, __: PayloadAction<PayloadDeals>) {},
    setDeals(state, { payload }) {
      state.collection = payload.collection;
      state.ids = payload.ids;
      state.meta.totalPages = payload.meta.totalPages;
      state.meta.totalCount = payload.meta.totalCount;
    },
    getDeal(_, __: PayloadAction<string | number>) {},
    pushDeal(state, { payload }) {
      state.collection[payload.id] = payload;
      state.ids.pop();
      state.ids.unshift(payload.id);
    },
    setDeal(state, { payload }: PayloadAction<Deal>) {
      state.deal = payload;
      if (state.collection[payload.id as string]) {
        state.collection[payload.id as string] = payload;
      }
    },
    putDeal(_, __) {},
    createDeals(
      _,
      __: PayloadAction<{
        lender: string;
        total_price: string;
        request_id: string | number;
        tags: Array<{
          name: string;
          destroy: boolean;
        }>;
      }>
    ) {},
    changeStatusDeals(_, __) {},
    updateDeals(state, { payload }) {
      state.deal.status = payload.status;
      if (state.collection[payload.id]) {
        state.collection[payload.id].status = payload.status;
      }
    },
  },
});
