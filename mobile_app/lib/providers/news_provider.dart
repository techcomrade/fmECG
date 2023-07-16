import 'package:flutter/material.dart';

class NewsProvider extends ChangeNotifier {
  List allNews = [];
  int quantity = 0;

  void setAllNews(List newsFromApi) {
    allNews = newsFromApi;
    notifyListeners();
  }

  void setQuantity(int quantityFromApi) {
    quantity = quantityFromApi;
    notifyListeners();
  }
}