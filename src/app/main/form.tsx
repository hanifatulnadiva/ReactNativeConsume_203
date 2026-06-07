import { ThemedText } from "@/components/themedText";
import { ThemedView } from "@/components/themed-view";
import { useHewanViewModel } from "@/hooks/useHewanViewModel";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Platform,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FormHewanScreen() {
const params = useLocalSearchParams();
const isEdit = !!params.id;

  const [nama, setNama] = useState((params.nama as string) ?? "");
  const [jenis, setJenis] = useState((params.jenis as string) ?? "");
  const [harga, setHarga] = useState (params.harga ?String(params.harga):"");
  const [tanggalLahir, setTanggalLahir] = useState(new Date());
  const [status, setStatus] = useState("tersedia")
  const [showDatePicker, setShowDatePicker] = useState(false);

  const { addHewan, loading, error } = useHewanViewModel();
  const router = useRouter();

  const formatDateString = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const onChangeDate = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      setTanggalLahir(selectedDate);
    }
  };
  const onSubmit = () => {
    const cleanNama = nama.trim();
    const cleanJenis = jenis.trim();
    const numericHarga = Number(harga);

    if (!cleanNama) {
      Alert.alert("Validasi Gagal", "Nama hewan wajib diisi");
      return;
    }
    if (!cleanJenis) {
      Alert.alert("Validasi Gagal", "Jenis hewan wajib diisi");
      return;
    }
    if (!harga || isNaN(numericHarga) || numericHarga <= 0) {
      Alert.alert(
        "Validasi Gagal",
        "Harga harus berupa angka lebih besar dari 0",
      );
      return;
    }

    addHewan(
      {
        nama: cleanNama,
        jenis: cleanJenis,
        harga: numericHarga,
        tanggal_lahir: formatDateString(tanggalLahir),
        status: status,
      },
      () => {
        router.back();
      },
    );
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.header}>
          <ThemedText type="tittle">Tambah Ternak Baru</ThemedText>
        </ThemedView>
        <ThemedView style={styles.form}>
          {error && <ThemedText style={styles.errorText}>{error}</ThemedText>}
          <TextInput
            style={styles.input}
            placeholder="Nama hewan"
            placeholderTextColor="#94a3b8"
            value={nama}
            onChangeText={setNama}
          />
          <TextInput
            style={styles.input}
            placeholder="Jenis (contoh: Sapi Limosin)"
            placeholderTextColor="#94a3b8"
            value={jenis}
            onChangeText={setJenis}
          />
          <TextInput
            style={styles.input}
            placeholder="Harga (Rupiah)"
            placeholderTextColor="#94a3b8"
            keyboardType="number-pad"
            value={harga}
            onChangeText={(text) => {
              setHarga(text.replace(/[^0-9]/g, ""));
            }}
          />
          <ThemedView style={styles.pickerContainer}>
            <Picker
              selectedValue={status}
              onValueChange={(itemValue) => setStatus(itemValue)}
            >
              <Picker.Item label="Tersedia" value="tersedia" />
              <Picker.Item label="Terjual" value="terjual" />
            </Picker>
          </ThemedView>
          <TouchableOpacity
            style={styles.dateInputButton}
            onPress={() => setShowDatePicker(true)}
            activeOpacity={0.7}
          >
            <ThemedText style={styles.dateText}>
              Tanggal Lahir: {formatDateString(tanggalLahir)}
            </ThemedText>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={tanggalLahir}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={onChangeDate}
              maximumDate={new Date()}
            />
          )}
          <ThemedView style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
              disabled={loading}
            >
              <ThemedText style={styles.submitButtonText}>
                Kembali
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.submitButton}
              onPress={onSubmit}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <ThemedText style={styles.submitButtonText}>
                  Simpan
                </ThemedText>
              )}
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1, paddingHorizontal: 24 },
  header: { marginVertical: 24 },
  form: { gap: 16 },
  input: {
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: "#0f172a",
  },
  dateInputButton: {
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    justifyContent: "center",
  },
  dateText: { fontSize: 16, color: "#334155" },
  submitButton: {
    flex:1,
    backgroundColor: "#0284c7",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 12,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
    marginTop: 12,
  },
  backButton: {
    flex: 1,
    backgroundColor: "#64748b",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 12,
  },
  submitButtonText: { 
    color: "#ffffff", 
    fontSize: 16, fontWeight: "bold" 
  },
  errorText: { color: "#ef4444", textAlign: "center", fontWeight: "600" },
  pickerContainer: {
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 12,
  },
});
