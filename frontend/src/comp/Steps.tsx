import React from "react";

const Steps = () => {
  return (
    <div className="filteredProducts my-[60px] container text-center">
      <h3 className="font-bold mb-1  text-xl">واش تحتاج تعرف</h3>
      <p>خطوات شرائك لمنتج من موقعنا بطريقة سهلة و مضمونة</p>
      <ul className="flex flex-col mt-4 sm:mt-5 md:mt-6 lg:mt-7 items-end">
        <li className="flex justify-start flex-row-reverse items-center mb-2 ">
          <span className="w-2 aspect-square rounded-sm  bg-primary-color-100"></span>
          <p className="mr-1 text-xs md:text-base sm:text-sm ">
            تصفح الموقع و اختر المنتج أو مجموعة المنتجات التي أعجبتك (ي)
          </p>
        </li>
        <li className="flex justify-center flex-row-reverse items-center mb-2">
          <span className="w-2  aspect-square rounded-sm  bg-primary-color-100"></span>
          <p className="mr-1 text-xs md:text-base sm:text-sm ">
            يمكنك شراء المنتج مباشرة أو اضافته الى السلة ثم شرائه
          </p>
        </li>

        <li className="flex justify-center flex-row-reverse items-center mb-2">
          <span className="w-2 aspect-square rounded-sm  bg-primary-color-100"></span>
          <p className="mr-1 text-xs md:text-base sm:text-sm ">
            احرص على أن تكون معلومات الطلب صحيحة
          </p>
        </li>
        <li className="flex justify-center flex-row-reverse items-center mb-2">
          <span className="w-2 aspect-square rounded-sm  bg-primary-color-100"></span>
          <p className="mr-1 text-xs md:text-base sm:text-sm ">
            بعد طلبك سنتصل بك لتأكيد الطلبية في مدة أقل من 24 ساعة
          </p>
        </li>
        <li className="flex justify-center flex-row-reverse items-center mb-2">
          <span className="w-2 aspect-square rounded-sm  bg-primary-color-100"></span>
          <p className="mr-1 text-xs md:text-base sm:text-sm ">
            يمكنك ايضا الطلب عبر صفحتنا على فيسبوك او انستقرام او تيكتوك
          </p>
        </li>
        {/* <li className="flex justify-center flex-row-reverse items-center mb-2">
          <span className="w-2 aspect-square rounded-sm  bg-primary-color-100"></span>
          <p className="mr-1 text-xs md:text-base sm:text-sm ">
            اي استفسار اخر يمكنك الاتصال على : 0784463883
          </p>
        </li> */}
      </ul>
    </div>
  );
};

export default Steps;
