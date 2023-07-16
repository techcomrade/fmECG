import 'dart:convert';

import 'package:bluetooth_ecg/constants/api_constant.dart';
import 'package:bluetooth_ecg/providers/news_provider.dart';
import 'package:bluetooth_ecg/utils/utils.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:provider/provider.dart';

NewsProvider newsProvider = Utils.globalContext!.read<NewsProvider>();

class NewsController {
  static String apiGetAllNews = APIConstant.apiUrlProduction + 'news';

  static Future<void> getAllNews() async {
    try {
      final response = await http.get(Uri.parse(apiGetAllNews));
      final responseBody = jsonDecode(response.body);
      if (responseBody["status"] == "success") {
        final allNews = responseBody["data"];
        final quantityNews = responseBody["count"];
        newsProvider.setAllNews(allNews);
        newsProvider.setQuantity(quantityNews);
      }
    } catch (e) {
      debugPrint('error from getAllNews: $e');
      rethrow;
    }
  }
}