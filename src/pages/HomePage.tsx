// src\pages\HomePage.tsx

// External libs
import { useSelector } from 'react-redux';

// Store
import { RootState, useDispatch } from '@store';

// Services (slices & actions)
import { getPopularUsersThunk } from '../services/popularUsers/actions';
import { getCreatedAtUsersThunk } from '../services/createdAtUsers/actions';
import { getRandomUsersThunk } from '../services/randomUsers/actions';
import { getFilteredUsersThunk } from '../services/filteredUsers/actions';
import {
  isFiltersEmpty,
  resetFilters,
  setGender,
  setPlaces,
  setSkillType,
  setSubcategories,
} from '../services/filters/filters-slice';
import { resetFilteredUsers } from '../services/filteredUsers/filtered-users-slice';

// Types
import { GENDERS, TGender } from '@api/types';
import { SKILL_TYPES, TSkillType } from '../shared/types/filters';

// Features
import { FilterSection } from '@features';
import { SkillFilters } from '../features/filters/SkillFilters';
import { FiltersContainer } from '../features/filters/FiltersContainer';
import { ActiveFiltersBar } from '../features/filters/ActiveFiltersBar';

// Widgets
import {
  Footer,
  GridList,
  Header,
  NotificationsTable,
} from '@widgets';
import { CardShowcase, SHOWCASE_TITLES } from '../widgets/cardShowcase/CardShowcase';

// Shared
import { Icon } from '../shared/ui/icon/Icon';

// Styles
import styles from './HomePage.module.css';

export const HomePage = () => {

  const dispatch = useDispatch();

  // *************************************************
  // популярные пользователи
  const {
    users: popularUsers,
    isLoading: isPopularLoading,
    hasMore: hasMorePopular,
    page: popularPage,
  } = useSelector((state: RootState) => state.popularUsers);

  // функция загрузки последующих данных
  const handleLoadMorePopularUsers = () => {
    if (!isPopularLoading && hasMorePopular) {
      const nextPage = popularPage + 1;
      dispatch(getPopularUsersThunk(nextPage));
    }
  };

  // *************************************************
  // по created_at
  const {
    users: createdAtUsers,
    isLoading: isCreatedAtLoading,
    hasMore: hasMoreCreatedAt,
    page: createdAtPage,
  } = useSelector((state: RootState) => state.createdAtUsers);

    // функция загрузки последующих данных
  const handleLoadMoreCreatedAtUsers = () => {
    if (!isCreatedAtLoading && hasMoreCreatedAt) {
      const nextPage = createdAtPage + 1;
      dispatch(getCreatedAtUsersThunk(nextPage));
    }
  };

  // *************************************************
  // случайные пользователи
  const {
    users: randomUsers,
    isLoading: isRandomLoading,
    hasMore: hasMoreRandom,
    page: randomPage,
  } = useSelector((state: RootState) => state.randomUsers);

    // функция загрузки последующих данных
  const handleLoadMoreRandomUsers = () => {
    if (!isRandomLoading && hasMoreRandom) {
      const nextPage = randomPage + 1;
      dispatch(getRandomUsersThunk(nextPage));
    }
  };

  // *************************************************
  // отфильтрованные пользователи
  const filters = useSelector((s: RootState) => s.filters);
  const selectedGender = useSelector((s: RootState) => s.filters.gender);
  
  const {
    users: filteredUsers,
    isLoading: isFilteredLoading,
    hasMore: hasMoreFiltered,
    page: filteredPage,
  } = useSelector((state: RootState) => state.filteredUsers);

  // функция загрузки последующих данных
  const handleLoadMoreFilteredUsers = ( ) => {
    if (!isFilteredLoading && hasMoreFiltered) {
      const nextPage = filteredPage + 1;
      dispatch(getFilteredUsersThunk({ 
        page: nextPage, 
        gender: selectedGender,
        places: selectedPlaces,
        skillType: selectedSkillType,
        subcategories: selectedSubcategories,
      }));
    }
  };

  const selectedSubcategories = useSelector((s: RootState) => s.filters.subcategories);

  const subCategories = useSelector(
    (s: RootState) => s.categories.subcategories
  );

  const selectedSkillType = useSelector((s: RootState) => s.filters.skillType);

  // Получаем категории из Redux
  const categories = useSelector((s: RootState) => s.categories.categories);

  const handleSubcategoryToggle = (id: number) => {
    const current = [...selectedSubcategories];
    if (current.includes(id)) {
      dispatch(setSubcategories(current.filter((x) => x !== id)));
    } else {
      dispatch(setSubcategories([...current, id]));
    }
    dispatch(resetFilteredUsers());
    dispatch(getFilteredUsersThunk({
      page: 1,
      gender: selectedGender,
      places: selectedPlaces,
      skillType: selectedSkillType,
      subcategories: current.includes(id)
        ? current.filter((x) => x !== id)
        : [...current, id],
    }));
  };

  const selectedPlaces = useSelector((s: RootState) => s.filters.places);

  const handleGenderChange = (gender: TGender) => {
    dispatch(setGender(gender));
    dispatch(resetFilteredUsers()); // очистим список
    dispatch(getFilteredUsersThunk({ 
      page: 1,
      gender,
      places: selectedPlaces,
      skillType: selectedSkillType,
      subcategories: selectedSubcategories
   }));
  };


  const handlePlacesChange = (places: string[]) => {
    dispatch(setPlaces(places));
    dispatch(resetFilteredUsers()); // очистим список
    dispatch(getFilteredUsersThunk({ 
      page: 1,
      gender: selectedGender,
      places,
      skillType: selectedSkillType,
      subcategories: selectedSubcategories,
    }));
  };

  const handleResetAll = () => {
    dispatch(resetFilters());
    dispatch(resetFilteredUsers());
  };

  const handleSkillTypeChange = (newType: TSkillType) => {
    dispatch(setSkillType(newType));
    dispatch(resetFilteredUsers());
    dispatch(getFilteredUsersThunk({
      page: 1,
      gender: selectedGender,
      places: selectedPlaces,
      skillType: newType,
      subcategories: selectedSubcategories,
  }));
};


  const hasActiveFilters =
    filters.skillType !== SKILL_TYPES.ALL ||
    filters.subcategories.length > 0 ||
    filters.gender !== GENDERS.UNSPECIFIED ||
    filters.places.length > 0;

  return (
    <div className={styles.homePageWrapper}>
      <Header />

      <div className={styles.filterSectionWrapper}>
        <FiltersContainer
          title="Фильтры"
          onReset={hasActiveFilters ? handleResetAll : undefined}
        >
 
          <SkillFilters
            onSkillTypeChange={handleSkillTypeChange}
            // onSkillTypeChange={(newType) => dispatch(setSkillType(newType))}
            selectedSkillType={selectedSkillType}
            categories={categories}
            subcategories={subCategories}
            selectedSubcategories={selectedSubcategories}
            onSubcategoryToggle={handleSubcategoryToggle}
          />
          <FilterSection
            onGenderChange={handleGenderChange}
            onPlacesChange={handlePlacesChange}
            selectedGender={selectedGender}
            selectedPlaces={selectedPlaces}
          />
        </FiltersContainer>

        <div className={styles.showCaseWrapper}>
          <ActiveFiltersBar
            selectedSkillType={selectedSkillType}
            selectedGender={selectedGender}
            selectedPlaces={selectedPlaces}
            selectedSubcategories={selectedSubcategories}
            onSkillTypeChange={handleSkillTypeChange}
            // onSkillTypeChange={(newType) => dispatch(setSkillType(newType))}
            onChangeGender={handleGenderChange}
            onChangePlaces={handlePlacesChange}
            onSubcategoryToggle={handleSubcategoryToggle}
          />

        {isFiltersEmpty(filters) ? (          
                <>
                  <CardShowcase
                    title={SHOWCASE_TITLES.POPULAR}
                    buttonTitle="Смотреть все"
                    icon={<Icon name="chevronRight" />}
                  >
                    <GridList
                      rows={1}
                      users={popularUsers}
                      loading={isPopularLoading}
                      hasMore={hasMorePopular}
                      onLoadMore={handleLoadMorePopularUsers}
                    />
                  </CardShowcase>
                  <CardShowcase
                    title={SHOWCASE_TITLES.NEW}
                    buttonTitle="Смотреть все"
                    icon={<Icon name="chevronRight" />}
                  >
                    <GridList
                      rows={1}
                      users={createdAtUsers}
                      loading={isCreatedAtLoading}
                      hasMore={hasMoreCreatedAt}
                      onLoadMore={handleLoadMoreCreatedAtUsers}
                    />
                  </CardShowcase>

                  <CardShowcase
                    title={SHOWCASE_TITLES.RECOMMEND}
                    buttonTitle="Смотреть все"
                    icon={<Icon name="chevronRight" />}
                  >
                    <GridList
                      rows={1}
                      users={randomUsers}
                      loading={isRandomLoading}
                      hasMore={hasMoreRandom}
                      onLoadMore={handleLoadMoreRandomUsers}
                    />
                  </CardShowcase>

                </>
        ):(

              <div className={styles.filterSectionWrapper}>
                <CardShowcase
                  title={SHOWCASE_TITLES.MATCHING}
                  buttonTitle="Сначала новые"
                  icon={<Icon name="sort" />}
                  isIconFirst
                >
                  <GridList
                    users={filteredUsers}
                    loading={isFilteredLoading}
                    hasMore={hasMoreFiltered}
                    onLoadMore={handleLoadMoreFilteredUsers}
                  />
                </CardShowcase>
              </div>
          )
        }
        </div>
      </div>

      <h2>NotificationsTable</h2>
      <div  style={{ marginBottom: '300px' }}>
        <NotificationsTable/>
      </div>

      <Footer />
    </div>
  );
};
