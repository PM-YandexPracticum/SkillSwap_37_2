import React, { useState, useEffect } from "react";
import styles from "./PersonalData.module.css";
import { Input } from "../../shared/ui/input/Input";
import { DatePicker } from "../../shared/ui/date-picker/DatePicker";
import { Dropdown } from "../../shared/ui/input/input-dropdown/InputDropdown";
import { Button } from "../../shared/ui/button/Button";
import { Icon } from "../../shared/ui/icon/Icon";
import { getUserByID } from "../../api/Api";
import { TUser } from "../../api/types";
import { genderOptions } from "../../shared/ui/input/input-dropdown/dropdownData";
import { getImageUrl } from "../../shared/lib/helpers";
import { Textarea } from "../../shared/ui/textarea/Textarea";

export const PersonalData = () => {
  const [user, setUser] = useState<TUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    birthdate: null as Date | null,
    gender: "",
    city: "",
    about: "",
  });
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = Number(import.meta.env.VITE_AUTH_USER_ID);
        const userData = await getUserByID(userId);

        if (userData) {
          setUser(userData);
          setFormData({
            email: userData.email || "",
            name: userData.name || "",
            birthdate: userData.birthdate ? new Date(userData.birthdate) : null,
            gender: userData.gender || "",
            city: userData.from || "",
            about: userData.about || "",
          });
          setAvatar(userData.photo ? getImageUrl(userData.photo) : "");
        }
      } catch (error) {
        console.error("Ошибка загрузки данных пользователя:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDateChange = (date: Date | null) => {
    setFormData((prev) => ({
      ...prev,
      birthdate: date,
    }));
  };

  const handleDropdownChange =
    (field: keyof typeof formData) => (value: string | string[]) => {
      const stringValue = Array.isArray(value) ? value[0] || "" : value;
      setFormData((prev) => ({
        ...prev,
        [field]: stringValue,
      }));
    };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      about: e.target.value,
    }));
  };

  const handlePasswordChange = () => {
    // Заглушка для изменения пароля
    console.log("Функционал изменения пароля в разработке");
    alert("Функционал изменения пароля находится в разработке");
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatar(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь будет логика сохранения данных
    console.log("Данные для сохранения:", { ...formData, avatar });
  };

  if (loading) {
    return <div className={styles.loading}>Загрузка...</div>;
  }

  if (!user) {
    return <div className={styles.error}>Пользователь не найден</div>;
  }

  return (
    <div className={styles.personalData}>
      <div className={styles.content}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.emailPasswordGroup}>
            <Input
              label="Почта"
              value={formData.email}
              onChange={(value) => handleInputChange("email", value)}
              placeholder="Введите email"
              showEditIcon={true}
              type="email"
            />

            <div className={styles.passwordSection}>
              <button
                type="button"
                className={styles.passwordButton}
                onClick={handlePasswordChange}
              >
                Изменить пароль
              </button>
            </div>
          </div>

          <Input
            label="Имя"
            value={formData.name}
            onChange={(value) => handleInputChange("name", value)}
            placeholder="Введите ваше имя"
            showEditIcon={true}
          />

          <div className={styles.row}>
            <div className={styles.rowItem}>
              <DatePicker
                label="Дата рождения"
                selected={formData.birthdate}
                onChange={handleDateChange}
                placeholder="дд.мм.гггг"
              />
            </div>
            <div className={styles.rowItem}>
              <Dropdown
                label="Пол"
                value={formData.gender}
                onChange={handleDropdownChange("gender")}
                options={genderOptions}
                placeholder="Не указан"
                multiple={false}
              />
            </div>
          </div>

          <Input
            label="Город"
            value={formData.city}
            onChange={(value) => handleInputChange("city", value)}
            placeholder="Введите ваш город"
          />

          <div className={styles.aboutSection}>
            <Textarea
              label="О себе"
              value={formData.about}
              onChange={(value) => handleInputChange("about", value)}
              placeholder="Расскажите о себе"
              rows={4}
              showEditIcon={true}
            />
          </div>

          <Button type="submit" colored className={styles.saveButton} disabled>
            Сохранить
          </Button>
        </form>

        <div className={styles.avatarSection}>
          <div className={styles.avatarContainer}>
            {avatar ? (
              <img src={avatar} alt="Аватар" className={styles.avatar} />
            ) : (
              <Icon
                name="userCircle"
                size={244}
                className={styles.avatarIcon}
              />
            )}
            <label htmlFor="avatar-upload" className={styles.avatarEditButton}>
              <Icon name="galleryedit" size={24} />
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                style={{ display: "none" }}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
