type Props = {
  elements: number[];
  callback: (p: number) => void;
  className?: string;
  minWidthElement?: string;
  initialValue?: number;
} & MaxWidthProps &
  MarginProps;

const ItemsSlider = ({
  className,
  callback,
  elements = [],
  minWidthElement,
  initialValue,
  ...rest
}: Props) => {
  const [items, setItems] = useState(elements);
  const [swiper, setSwiper] = useState<{
    slideTo: (p: number) => void;
  } | null>(null);
  const isTransition = useRef(true);

  useEffect(() => {
    if (swiper) {
      if (initialValue != null) {
        swiper.slideTo(elements.indexOf(initialValue));
      }
    }
  }, [swiper, initialValue, elements]);

  const handleTransitionStopNext = useCallback(
    data => {
      callback(elements[data.realIndex]);
      isTransition.current = false;
    },
    [callback, elements]
  );

  const handleTransitionStopPrev = useCallback(
    data => {
      callback(elements[data.realIndex]);
      isTransition.current = false;
    },
    [callback, elements]
  );

  const handleMonthChoose = useCallback(() => {
    if (isTransition.current) return;
    isTransition.current = true;
  }, []);

  return (
    <Styled.Remote className={className} {...rest}>
      <Styled.Slider
        {...rest}
        onSwiper={setSwiper}
        minWidthElement={minWidthElement}
        centeredSlides
        slidesPerView="auto"
        slideToClickedSlide
        allowTouchMove
        onSlidePrevTransitionEnd={handleTransitionStopPrev}
        onSlideNextTransitionEnd={handleTransitionStopNext}
        grabCursor
        spaceBetween={15}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
      >
        <Styled.ShadowLeft />
        {items.map((m, i) => (
          <SwiperSlide key={m + i}>
            <Styled.MonthName onClick={() => handleMonthChoose(m)}>
              {m}
            </Styled.MonthName>
          </SwiperSlide>
        ))}
        <Styled.ShadowRight />
      </Styled.Slider>
    </Styled.Remote>
  );
};
