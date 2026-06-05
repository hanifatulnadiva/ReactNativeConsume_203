import * as Device from 'expo-device';
import { Alert, Platform, RefreshControl, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AnimatedIcon } from '@/components/animated-icon';
import { HintRow } from '@/components/hint-row';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { WebBadge } from '@/components/web-badge';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useHewanViewModel } from '@/hooks/useHewanViewModel';
import { useAuthViewModel } from '@/hooks/useAuthViewModel';
import { useEffect } from 'react';
import { ThamedText } from '@/components/thamedText';
import { FlatList } from 'react-native-reanimated/lib/typescript/Animated';
import { router } from 'expo-router';


export default function DashboardScreen() {
  const {hewanList, loading, fetchHewan, deleteHewan}= useHewanViewModel();
  const {handleLogout} = useAuthViewModel();
  useEffect(()=>{
    fetchHewan();
  },[fetchHewan]);

  const confirmDelete =(id:number, namaHewan:string)=>{
    Alert.alert(
      'Konfirmasi Hapus',
      `Apakah Anda yakin ingin menghapus ${namaHewan}?`,
      [
        {
          text:'Tidak',
          style:'cancel'
        },
        {
          text:'Ya',
          style:'destructive',
          onPress:async ()=> {
            await deleteHewan(id);
            fetchHewan();
          },
        },
      ],
      {cancelable:true}
    );
  };
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.header}>
          <ThamedText type="tittle">Daftar Ternak</ThamedText>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <ThemedText style={styles.logoutText}>Logout</ThemedText>
          </TouchableOpacity>
        </ThemedView>

        <FlatList
        data={hewanList}
        keyExtractor={(item)=>item.id!.toString()}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={fetchHewan} tintColor="#0284c7" />
        }
        ListEmptyComponent={
          <ThemedView style={styles.emptyContainer}>
            <ThamedText style={styles.emptyText}>Belum ada data hewan ternak</ThamedText>
          </ThemedView>
        }

        renderItem={({item})=>(
          <ThemedView style={styles.card}>
            <ThemedView style={styles.cardInfo}>
              <ThamedText type="defaultSemiBold"  style={styles. animalName}>
                {item.nama}
              </ThamedText>
              <ThamedText style={styles.animalMeta}>
                {item.jenis} . <ThamedText style={item.status === 'tersedia'? styles.statusActive : styles.statusSold} > {item.status}</ThamedText>
              </ThamedText>
              <ThamedText style ={styles.animalPrice}> Rp{item.harga.toLocaleString('id-ID')}</ThamedText>
            </ThemedView>
            <TouchableOpacity style= {styles.deleteButton}
              onPress={()=> confirmDelete(item.id!, item.nama)}
            >
              <ThamedText style= {styles.deleteButtonText}>Hapus</ThamedText>
            </TouchableOpacity>
          </ThemedView>
        )}
      />
      <TouchableOpacity 
        style={styles.fab}
        onPress={()=> router.push('/main/form')}
      >
        <ThamedText style= {styles.fabText}>+</ThamedText>
      </TouchableOpacity>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingHorizontal:20,
    paddingTop:16,
    paddingBottom:12,
    borderBottomWidth:1,
    borderBottomColor:'#f1f5f9'
  },
  logoutButton:{
    backgroundColor:'3ef4444',
    fontSize:12,
    fontWeight:'600',
  },
  logoutText:{
    color:'#ef4444',
    fontSize:12,
    fontWeight:'600'
  },
  listContent:{
    padding:20,
    gap:12,
    paddingBottom:100
  },
  card:{
    backgroundColor:'#f8fafc',
    borderWidth:1,
    borderColor:'#e2e8f0',
    borderRadius:16,
    padding:12,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  cardInfo:{
    gap:4,
    flex:1,
    backgroundColor:'transparent',
  },
  animalName:{
    fontSize:18
  },
  animalMeta:{
    fontSize:14,
    color: '#64748b',
  },
  animalPrice:{
    fontSize:16,
    fontWeight:'600',
    color:'#0284c7',
    marginTop:2
  },
  statusActive:{
    color:'#22c55e',
    fontWeight:'600'
  },
  statusSold:{
    color:'#94a3b8',
    fontWeight:'600'
  },
  deleteButton:{
    backgroundColor:'fff1f1',
    borderWidth:1,
    borderColor:'#fee2e2',
    paddingHorizontal:12,
    paddingVertical:8,
    borderRadius:10
  },
  deleteButtonText:{
    color:'#ef4444',
    fontWeight:'600',
    fontSize:13,
  },
  emptyContainer:{
    alignContent:'center',
    justifyContent:'center',
    paddingVertical:40
  },
  emptyText:{
    color:'#94a3b8'
  },
  fab:{
    position:'absolute',
    bottom:24,
    right:24,
    backgroundColor:'#0284c7',
    width:56,
    height:56,
    borderRadius:28,
    justifyContent:'center',
    alignItems:'center',
    shadowColor:'#0284c7',
    shadowOffset:{width:0, height:4},
    shadowOpacity:0.3,
    shadowRadius:6,
    elevation:5
  },
  fabText:{
    color:'#ffffff',
    fontSize:28,
    fontWeight:'300',
    marginTop: -2
  },
  title: {
    textAlign: 'center',
  },
  code: {
    textTransform: 'uppercase',
  },
  stepContainer: {
    gap: Spacing.three,
    alignSelf: 'stretch',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.four,
    borderRadius: Spacing.four,
  },
});
