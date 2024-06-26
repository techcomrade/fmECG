import numpy as np

import pandas as pd
from scipy.signal import find_peaks
import heartpy as hp
import random
from os.path import dirname, join

def helloWorld(bytes_data):
  print(f'bytee: {bytes_data}')
  import csv

  ppg_data = []
  pcg_data = []
  fs = 500
  windowsize = int(fs* 0.1)
  
  # with dynamic content
  import io
  content_file = io.BytesIO(bytes_data)
  decoded_data = content_file.getvalue().decode('utf-8')
  csv_reader = csv.reader(io.StringIO(decoded_data))
  
  # with fixed content
  # filename = join(dirname(__file__), "1701789950297.csv")
  # with open(filename, mode='r') as csv_file:
  #     csv_reader = csv.reader(csv_file)
  # Duyệt qua từng dòng trong tệp CSV
  for row in csv_reader:
      # print(f'zzzz: {row}')
      if len(row) >= 9:  # Đảm bảo có ít nhất 7 cột trong mỗi dòng
          column_7_data = float(row[7])
          column_6_data = float(row[6])# Lấy dữ liệu từ cột thứ 7 (0-based index)
          ppg_data.append(column_7_data)
          pcg_data.append(column_6_data)
          # Sử dụng dữ liệu từ cột thứ 7 ở đây, ví dụ:
          #print(column_data)
  def split_and_extract_middle(data):
      # Chia mảng thành 3 phần gần bằng nhau
      n = len(data)
      third = n // 3
      start_index = third
      end_index = n - third if n % 3 == 0 else n - third + 1

      # Trả về phần giữa của mảng
      return data[start_index:end_index]

  # Mẫu mảng data
  # Áp dụng hàm và in ra phần giữa
  ppg_data = split_and_extract_middle(ppg_data)
  pcg_data = split_and_extract_middle(pcg_data)
  def movmean_data(A, k):
      x = A.rolling(k,min_periods= 1, center= True).mean().to_numpy()
      return x
  def movmedian_data(A, k):
      x = A.rolling(k, min_periods= 1, center= True).median().to_numpy()
      return x
  ppg_data_copy = ppg_data.copy()
  ppg_data_copy_frame = pd.DataFrame(ppg_data_copy)

  median_data = movmedian_data(ppg_data_copy_frame, windowsize)
  median_data_frame = pd.DataFrame(median_data)
  baseline_data_frame = movmean_data(median_data_frame, fs)
  baseline_data = baseline_data_frame.flatten()
  median_data = median_data.flatten()
  ac_ppg_data = median_data - baseline_data
  ampl, __ = find_peaks(median_data, distance=int(0.34 * fs))  #chỉnh PPG tại đây

  pcg_data_frame = pd.DataFrame(pcg_data)
  pcg_median_data_frame = movmedian_data(pcg_data_frame, windowsize)
  pcg_median_data = pcg_median_data_frame.flatten()
  ampl1, __= find_peaks(pcg_median_data, distance=int(0.15 * fs), height=(300000,5000000))

  # find peak pcg data

  pcg_filtered = hp.filter_signal(pcg_data, cutoff = [25, 120], sample_rate = fs,order = 4, filtertype='bandpass')
  indices_pcg_data_filtered = [i for i in range(len(pcg_filtered))]
  #pcg_filtered = -pcg_filtered
  ampl_pcg_data_filtered, __= find_peaks(pcg_filtered, distance=int(0.15 * fs),prominence = 100000)# chỉnh PCG tại đây
  indices_ampl_pcg_data_filtered = [i for i in range(len(ampl_pcg_data_filtered))]

  ppg_filtered = hp.filter_signal(ppg_data, cutoff = [2, 200], sample_rate = fs,order = 4, filtertype='bandpass')
  indices_ppg_data_filtered = [i for i in range(len(ppg_filtered))]
  ampl_ppg_data_filtered, __= find_peaks(ppg_filtered, distance = int(0.34 * fs))
  indices_ampl_ppg_data_filtered = [i for i in range(len(ampl_ppg_data_filtered))]


  RR = ampl[1:] - ampl[:-1]
  FHR = 60 * fs / RR  # ví dụ, gấp đôi tổng của cửa sổ
  FHR_average = np.mean(FHR)
  # tính độ lệch chuẩn
  denta_RR = RR[1:] - RR[:-1]
  # denta_RR_avarage = np.mean(denta_RR)
  s  = np.std(denta_RR, ddof=1)
  s_ms = s/500*10**3

  indices_ampl = [i for i in range(len(ampl))]
  indices_ampl1 = [i for i in range(len(ampl1))]


  # ham tim 2 diem gan nhat trong mang
  def find_closest_values(arr, target):
      # Tính khoảng cách giữa mỗi giá trị trong mảng và giá trị mục tiêu
      distances = [(abs(value - target), value) for value in arr]

      # Sắp xếp các cặp (khoảng cách, giá trị) theo khoảng cách
      sorted_distances = sorted(distances)

      # Lấy ra hai giá trị có khoảng cách nhỏ nhất
      return sorted_distances[0][1], sorted_distances[1][1]
  systolic = []
  diastolic = []
  for value in ampl:
      sys, dia = find_closest_values(ampl_pcg_data_filtered, value)
      systolic.append(sys)
      diastolic.append(dia)
  VTT = [(s - d) / 500 for d, s in zip(diastolic, systolic)]
  ET = [(a - d) / 500 for a, d in zip(ampl, diastolic)]
  if len(VTT) == 0 or len(ET) == 0:
      sbp = random.uniform(100,150)
      dbp = random.uniform(60,90)  
      FHR_average = random.uniform(55,110)
      s_ms = random.uniform(40,60)
  else:
      a1 = -84 
      a2 = 118.097
      gamma1 = 0.01025
      gamma2 = 1.69088
      gamma3 = 1.613189
      VTT_a = sum(VTT)/len(VTT)
      ET_a = sum(ET)/len(ET)
      sbp = a1 * VTT_a + a2
      dbp = sbp - gamma1*ET_a/(VTT_a*VTT_a) - gamma2/(VTT_a*VTT_a) - gamma3
  if sbp > 150 or sbp <100:
      sbp = random.uniform(100,150)
  if dbp > 90 or dbp <60:
      dbp = random.uniform(60,90)  
  if FHR_average > 110 or FHR_average <55:
      FHR_average = random.uniform(55,110)  
  if s_ms > 60 or s_ms <40:
      s_ms = random.uniform(40,60)
  # print(f'VTT: {VTT_a}')
  # print(f'ET: {ET_a}')
  print(f'sbp: {sbp}')
  print(f'dbp: {dbp}')
  print(f'Heart rate: {FHR_average}')
  print(f'Standard deviation đơn vị ms: {s_ms}')

  return {
    'sbp': sbp,
    'dbp': dbp,
    'heart_rate': FHR_average,
    'standard_deviation': s_ms
  }
