'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.bulkInsert('users', [
      {
        id: 'f86068c7-08ed-4dfc-b96d-e0e1c0ae09df',
        account_id: '86d1470c-de72-457c-a8e1-a616e55f463f',
        username: 'nguyễn văn dương',
        gender: 0,
        birth: '616212222',
        phone_number: '0912234888',
        image: '01201020120abc',
        status: 0,
        information: ' chẩn đoán tăng huyết áp từ năm 2015 với mức huyết áp dao động từ 140/90 mmHg đến 160/100 mmHg và hiện đang điều trị bằng Amlodipine 5mg và Lisinopril 10mg mỗi ngày. Bệnh nhân cũng có tiền sử rối loạn nhịp tim từ năm 2018 với các triệu chứng như nhịp tim nhanh bất thường và mệt mỏi, đang điều trị bằng Bisoprolol 5mg mỗi ngày. Bệnh nhân được yêu cầu theo dõi huyết áp và nhịp tim hàng ngày, tuân thủ chế độ ăn uống ít muối, ít chất béo bão hòa, giàu rau xanh, và thực hiện các bài tập thể dục nhẹ nhàng.',
        role: 1,
        created_at: '1711115945125',
        updated_at: '1711115945125'
      },
      {
        id: '4df9ace1-0229-4756-b850-51a83cb0bb6e',
        account_id: '1bd51bda-3179-4f27-bcfd-000e5c4a2aa7',
        username: 'trần văn quyến',
        gender: 1,
        birth: '616212222',
        phone_number: '09122348767',
        image: '0101010101abc',
        status: 0,
        information: 'có tiền sử tăng huyết áp từ năm 2010 với mức huyết áp thường xuyên dao động từ 150/95 mmHg đến 170/105 mmHg, đang điều trị bằng thuốc Enalapril 10mg mỗi ngày. Bệnh nhân cũng gặp phải tình trạng nhịp tim không đều (loạn nhịp tim) từ năm 2015, thường xuất hiện nhịp tim chậm và yếu, đang điều trị bằng thuốc Metoprolol 25mg mỗi ngày. Bệnh nhân được yêu cầu theo dõi huyết áp và nhịp tim hàng ngày, duy trì chế độ ăn uống lành mạnh, ít muối, và thường xuyên tập thể dục như đi bộ và yoga.',
        role: 0,
        created_at: '1711118359957',
        updated_at: '1711118359957'
      },
      {
        id: '37ae5629-54ec-46e0-be65-9af6bd500b3b',
        account_id: '83573421-9943-4a25-9fe1-00f0477aaba4',
        username: 'Nguyễn Lâm Tùng',
        gender: 0,
        birth: '1232366',
        phone_number: '09122348669',
        image: '010101010100abc',
        status: 0,
        information: 'được chẩn đoán tăng huyết áp từ năm 2012 với mức huyết áp dao động từ 145/90 mmHg đến 155/95 mmHg, hiện đang điều trị bằng thuốc Losartan 50mg mỗi ngày. Bệnh nhân có tiền sử rối loạn nhịp tim từ năm 2016 với các triệu chứng như nhịp tim nhanh và đau ngực, đang điều trị bằng thuốc Atenolol 50mg mỗi ngày. Bệnh nhân được khuyến cáo theo dõi huyết áp và nhịp tim hàng ngày, ăn uống cân bằng, hạn chế muối và chất béo, và thực hiện các bài tập thể dục nhẹ nhàng như đi bộ và đạp xe.',
        role: 2,
        created_at: '1711121415247',
        updated_at: '1711121415247'
      },
      {
        id: '178d7109-7568-472c-9350-2db42aa152f6',
        account_id: '22183931-6fc3-4518-af34-e86c8605b08a',
        username: 'trần văn bắc',
        gender: 1,
        birth: '647748222',
        phone_number: '091223486384',
        image: '01010101010110abc',
        status: 0,
        information: 'có tiền sử tăng huyết áp từ năm 2008 với mức huyết áp dao động từ 160/100 mmHg đến 180/110 mmHg, hiện đang điều trị bằng thuốc Hydrochlorothiazide 25mg mỗi ngày. Bệnh nhân cũng gặp phải tình trạng rối loạn nhịp tim từ năm 2013 với các triệu chứng như nhịp tim không đều và mệt mỏi, đang điều trị bằng thuốc Diltiazem 120mg mỗi ngày. Bệnh nhân được yêu cầu theo dõi huyết áp và nhịp tim hàng ngày, tuân thủ chế độ ăn ít muối, ít chất béo bão hòa, và thường xuyên tập thể dục nhẹ nhàng như đi bộ và bơi lội.',
        role: 1,
        created_at: '1711206172234',
        updated_at: '1711206172234'
      },
      {
        id: '37ae5629-54ec-46e0-be65-9af6bd580b2b',
        account_id: '83573421-9943-4a25-9fe1-00f0477aaba9',
        username: 'trần văn dũng',
        gender: 0,
        birth: '647748222',
        phone_number: '09122348669',
        image: '010101010100abc',
        status: 0,
        information: 'có tiền sử tăng huyết áp từ năm 2010 với mức huyết áp thường xuyên dao động từ 150/95 mmHg đến 170/105 mmHg, đang điều trị bằng thuốc Enalapril 10mg mỗi ngày. Bệnh nhân cũng gặp phải tình trạng nhịp tim không đều (loạn nhịp tim) từ năm 2015, thường xuất hiện nhịp tim chậm và yếu, đang điều trị bằng thuốc Metoprolol 25mg mỗi ngày. Bệnh nhân được yêu cầu theo dõi huyết áp và nhịp tim hàng ngày, duy trì chế độ ăn uống lành mạnh, ít muối, và thường xuyên tập thể dục như đi bộ và yoga.',
        role: 2,
        created_at: '1711121415247',
        updated_at: '1711121415247'
      },
      {
        id: '37ae5629-54ec-46e0-be65-9af6bd580b3b',
        account_id: '83573421-9943-4a25-9fe1-00f0477aaba8',
        username: 'nguyễn thị đào',
        gender: 1,
        birth: '647748222',
        phone_number: '09122348669',
        image: '010101010100abc',
        status: 0,
        information: 'có tiền sử tăng huyết áp từ năm 2008 với mức huyết áp dao động từ 160/100 mmHg đến 180/110 mmHg, hiện đang điều trị bằng thuốc Hydrochlorothiazide 25mg mỗi ngày. Bệnh nhân cũng gặp phải tình trạng rối loạn nhịp tim từ năm 2013 với các triệu chứng như nhịp tim không đều và mệt mỏi, đang điều trị bằng thuốc Diltiazem 120mg mỗi ngày. Bệnh nhân được yêu cầu theo dõi huyết áp và nhịp tim hàng ngày, tuân thủ chế độ ăn ít muối, ít chất béo bão hòa, và thường xuyên tập thể dục nhẹ nhàng như đi bộ và bơi lội.',
        role: 2,
        created_at: '1711121415247',
        updated_at: '1711121415247'
      },
      {
        id: '37ae5629-54ec-46e0-be65-9af6bd580b4b',
        account_id: '83573421-9943-4a25-9fe1-00f0477aaba2',
        username: 'Phạm Đình huong',
        gender: 1,
        birth: '332215422',
        phone_number: '09122348669',
        image: '010101010100abc',
        status: 0,
        information: 'được chẩn đoán tăng huyết áp từ năm 2012 với mức huyết áp dao động từ 145/90 mmHg đến 155/95 mmHg, hiện đang điều trị bằng thuốc Losartan 50mg mỗi ngày. Bệnh nhân có tiền sử rối loạn nhịp tim từ năm 2016 với các triệu chứng như nhịp tim nhanh và đau ngực, đang điều trị bằng thuốc Atenolol 50mg mỗi ngày. Bệnh nhân được khuyến cáo theo dõi huyết áp và nhịp tim hàng ngày, ăn uống cân bằng, hạn chế muối và chất béo, và thực hiện các bài tập thể dục nhẹ nhàng như đi bộ và đạp xe.',
        role: 2,
        created_at: '1711121415247',
        updated_at: '1711121415247'
      },
      {
        id: '37ae5629-54ec-46e0-be65-9af6bd510b2b',
        account_id: '83573421-9943-4a25-9fe1-00f0477aaba6',
        username: 'Pham văn tiến',
        gender: 0,
        birth: '332215422',
        phone_number: '09122348669',
        image: '010101010100abc',
        status: 0,
        information: 'có tiền sử tăng huyết áp từ năm 2008 với mức huyết áp dao động từ 160/100 mmHg đến 180/110 mmHg, hiện đang điều trị bằng thuốc Hydrochlorothiazide 25mg mỗi ngày. Bệnh nhân cũng gặp phải tình trạng rối loạn nhịp tim từ năm 2013 với các triệu chứng như nhịp tim không đều và mệt mỏi, đang điều trị bằng thuốc Diltiazem 120mg mỗi ngày. Bệnh nhân được yêu cầu theo dõi huyết áp và nhịp tim hàng ngày, tuân thủ chế độ ăn ít muối, ít chất béo bão hòa, và thường xuyên tập thể dục nhẹ nhàng như đi bộ và bơi lội.',
        role: 2,
        created_at: '1711121415247',
        updated_at: '1711121415247'
      },
      {
        id: '37ae5629-54ec-46e0-be65-9af6bd680b2b',
        account_id: '83573421-9943-4a25-9fe1-00f0477aaba5',
        username: 'trần văn nam',
        gender: 0,
        birth: '1232366',
        phone_number: '09122348669',
        image: '010101010100abc',
        status: 0,
        information: ' chẩn đoán tăng huyết áp từ năm 2015 với mức huyết áp dao động từ 140/90 mmHg đến 160/100 mmHg và hiện đang điều trị bằng Amlodipine 5mg và Lisinopril 10mg mỗi ngày. Bệnh nhân cũng có tiền sử rối loạn nhịp tim từ năm 2018 với các triệu chứng như nhịp tim nhanh bất thường và mệt mỏi, đang điều trị bằng Bisoprolol 5mg mỗi ngày. Bệnh nhân được yêu cầu theo dõi huyết áp và nhịp tim hàng ngày, tuân thủ chế độ ăn uống ít muối, ít chất béo bão hòa, giàu rau xanh, và thực hiện các bài tập thể dục nhẹ nhàng.',
        role: 2,
        created_at: '1711121415247',
        updated_at: '1711121415247'
      },
      {
        id: '37ae5629-54ec-46e0-be45-9af6bd580b2b',
        account_id: '83573421-9943-4a25-9fe1-00f0477aaba1',
        username: 'phạm đình hoang',
        gender: 0,
        birth: '332215422',
        phone_number: '09122348669',
        image: '010101010100abc',
        status: 0,
        information: 'được chẩn đoán tăng huyết áp từ năm 2012 với mức huyết áp dao động từ 145/90 mmHg đến 155/95 mmHg, hiện đang điều trị bằng thuốc Losartan 50mg mỗi ngày. Bệnh nhân có tiền sử rối loạn nhịp tim từ năm 2016 với các triệu chứng như nhịp tim nhanh và đau ngực, đang điều trị bằng thuốc Atenolol 50mg mỗi ngày. Bệnh nhân được khuyến cáo theo dõi huyết áp và nhịp tim hàng ngày, ăn uống cân bằng, hạn chế muối và chất béo, và thực hiện các bài tập thể dục nhẹ nhàng như đi bộ và đạp xe.',
        role: 2,
        created_at: '1711121415247',
        updated_at: '1711121415247'
      }
    ]
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
